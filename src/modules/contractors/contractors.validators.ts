import Joi from "joi";

export const updateContractor = Joi.object({
  firstName: Joi.string().min(2).max(255),
  lastName: Joi.string().min(2).max(255),
  email: Joi.string().email(),
  location: Joi.object({
    address: Joi.string(),
    state: Joi.string(),
    zipcode: Joi.string(),
    country: Joi.string(),
  }),
});

export const signUp = Joi.object({
  firstName: Joi.string().min(2).max(255),
  lastName: Joi.string().min(2).max(255),
  email: Joi.string().email().required(),
  signature: Joi.string().required(),
});

export const login = Joi.object({
  signature: Joi.string().min(2).max(255),
});
