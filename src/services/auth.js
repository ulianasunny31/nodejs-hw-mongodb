import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/auth.js';

import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

import {
  FIFTEEN_MINUTES,
  SMTP,
  TEMPLATES_DIR,
  THIRTY_DAYS,
} from '../constants/index.js';
import { SessionCollection } from '../db/model/session.js';

import jwt from 'jsonwebtoken';
import { getEnvVariables } from '../utils/getEnvVarviables.js';

import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import { sendEmail } from '../utils/sendEmail.js';
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
  await SessionCollection.deleteOne({ _id: sessionId });
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  //checking if this session exists
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  //checking if session is expired
  if (new Date(session.refreshTokenValidUntil) < new Date()) {
    throw createHttpError(401, 'Session has expired');
  }

  const newSession = createSession();

  //deleting previous session
  await SessionCollection.deleteOne({ _id: session._id });

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestReset = async (email) => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'Contact not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    getEnvVariables('JWT_SECRET'),
    { expiresIn: '5m' },
  );

  const templatePath = path.join(TEMPLATES_DIR, 'resetemail.html');
  const templateSourse = (await fs.readFile(templatePath)).toString();

  const template = handlebars.compile(templateSourse);
  const html = template({
    name: user.name,
    link: `${getEnvVariables('DOMAIN')}/reset-password?token=${resetToken}`,
  });

  await sendEmail({
    from: getEnvVariables(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

//
//
//

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
