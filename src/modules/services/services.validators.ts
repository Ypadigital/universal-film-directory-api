import Joi from "joi";

export const addServiceValidator = Joi.object({
  title: Joi.string().trim().required(),
  images: Joi.array().items(Joi.string()).required(),
  rate: Joi.object({
    type: Joi.string().trim().valid("month", "week", "day", "hour").required(),
    amount: Joi.number().required(),
  }).required(),
  overview: Joi.string().required(),
  link: Joi.string().trim().allow(""),
  categoryId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const updateServiceValidator = Joi.object({
  title: Joi.string().trim(),
  images: Joi.array().items(Joi.string()),
  rate: Joi.object({
    type: Joi.string().valid("month", "week", "day", "hour"),
    amount: Joi.number(),
  }),
  overview: Joi.string(),
  link: Joi.string().trim().allow(""),
  categoryId: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
});
