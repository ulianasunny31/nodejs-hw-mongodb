import createHttpError from 'http-errors';
import { UsersCollection } from '../db/model/auth.js';

import bcrypt from 'bcrypt';

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

export const loginUser = async () => {};
