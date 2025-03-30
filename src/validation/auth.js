import Joi from 'joi';

export const RegisterValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(25).required(),
  password: Joi.string().min(3).max(20).required(),
});

export const LoginValidationSchema = Joi.object({
  email: Joi.string().email().min(3).max(25).required(),
  password: Joi.string().min(3).max(20).required(),
});

export const RequestEmailSchema = Joi.object({
  email: Joi.string().email().min(3).max(25).required(),
});

export const ResetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(3).max(20).required(),
});
