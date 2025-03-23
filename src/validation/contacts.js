import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const createContactValidation = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().min(3).max(20),
  phoneNumber: Joi.string().min(8).max(15).required(),
  contactType: Joi.string().valid('personal', 'work', 'home').required(),
  isFavourite: Joi.boolean(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return true;
  }),
});

export const updateContactValidation = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email().min(3).max(20),
  phoneNumber: Joi.string().min(8).max(15),
  contactType: Joi.string().valid('personal', 'work', 'home'),
  isFavourite: Joi.boolean(),
});
