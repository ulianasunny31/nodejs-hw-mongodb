import { UsersCollection } from '../db/model/users';

export const registerUser = async (payload) => {
  return await UsersCollection.create(payload);
};

export const loginUser = async () => {};
