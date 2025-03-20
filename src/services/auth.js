import { UsersCollection } from '../db/model/auth.js';

export const registerUser = async (payload) => {
  return await UsersCollection.create(payload);
};

export const loginUser = async () => {};
