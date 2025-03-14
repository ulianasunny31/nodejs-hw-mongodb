import Joi from 'joi';

export const createContactValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20).required(),
  phoneNumber: Joi.string().min(8).max(15).required(),
  contactType: Joi.string().valid('personal', 'work', 'home').required(),
  isFavourite: Joi.boolean().required(),
});

export const updateContactValidation = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  phoneNumber: Joi.string().min(8).max(15),
  contactType: Joi.string().valid('personal', 'work', 'home'),
  isFavourite: Joi.boolean(),
});
