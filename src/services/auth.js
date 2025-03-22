import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/auth.js';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';
import { SessionCollection } from '../db/model/session.js';

//
//

export const registerUser = async (payload) => {
  //hiding password
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  //checking for non-unique email
  const existingUser = await UsersCollection.findOne({ email: payload.email });
  if (existingUser) throw createHttpError(409, 'Email in use');

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async (payload) => {
  //checking if this user with this email exists
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) throw createHttpError(404, 'User not found');

  //comparing passwords
  const isEqualPasswords = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isEqualPasswords) throw createHttpError(401, 'Unauthorized');

  //deleting previous session
  await SessionCollection.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId) => {
  await SessionCollection.deleteOne({ id: sessionId });
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  //checking if this session exists
  const session = await SessionCollection.findOne({
    id: sessionId,
    refreshToken,
  });
  if (!session) throw createHttpError(401, 'Session not found');

  //checking if session is expired
  if (new Date(session.refreshTokenValidUntil) < new Date()) {
    throw createHttpError(401, 'Session has expired');
  }

  const newSession = createSession();
  await SessionCollection.deleteOne({ id: session.id });
  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

function createSession() {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  };
}
