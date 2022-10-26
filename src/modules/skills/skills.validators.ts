import Joi from "joi";

export const addSkillValidator = Joi.object({
  name: Joi.string().required(),
});
