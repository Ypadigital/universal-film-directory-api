import Joi from "joi";

export const imageUpload = Joi.object({
  file: Joi.string(),
});
