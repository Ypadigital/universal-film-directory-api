import Joi from "joi";

export const addJobValidator = Joi.object({
  serviceId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Invalid Service Id Included")
    .required(),
});

export const addCustomJobValidator = Joi.object({
  title: Joi.string().required(),
  rate: Joi.object({
    type: Joi.string().allow("hourly", "fixed").required(),
    amount: Joi.number().required(),
  }).required(),
  freelancerId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .message("Invalid Freelancer Id Included")
    .required(),
});
