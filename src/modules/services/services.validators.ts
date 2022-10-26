import Joi from "joi";

export const addServiceValidator = Joi.object({
  title: Joi.string().required(),
  images: Joi.any(),
  rate: Joi.string().required(),
  duration: Joi.string().required(),
  overview: Joi.string().required(),
});
