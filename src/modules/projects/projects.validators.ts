import Joi from "joi";

export const projectsUpload = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  tokenId: Joi.number().required(),
  pricePerFraction: Joi.number().required(),
  totalSupply: Joi.number().required(),
  traits: Joi.array(),
  curator: Joi.string().required(),
  image: Joi.string().required(),
});
