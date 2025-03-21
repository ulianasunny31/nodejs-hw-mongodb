import { registerUser, loginUser } from '../services/auth.js';

export const registerUserController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

export const loginUserController = async (req, res, next) => {
  await loginUser(req.body);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in a user!',
  });
};
