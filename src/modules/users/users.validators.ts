import Joi from "joi";

export const updateUser = Joi.object({
  firstName: Joi.string().min(2).max(255),
  lastName: Joi.string().min(2).max(255),
  email: Joi.string().email(),
  experiences: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      content: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
  ),
  education: Joi.array().items(
    Joi.object({
      title: Joi.string(),
      content: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
  ),
  skills: Joi.array().items(
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid Skill Id Included")
  ),
  location: Joi.object({
    address: Joi.string(),
    state: Joi.string(),
    zipcode: Joi.string(),
    country: Joi.string(),
  }),
  socialLinks: Joi.object({
    facebook: Joi.string(),
    twitter: Joi.string(),
    linkedIn: Joi.string(),
    dribble: Joi.string(),
    behance: Joi.string(),
  }),
  overview: Joi.string(),
  languages: Joi.array().items(Joi.string()),
  hourlyRate: Joi.number(),
  jobDescription: Joi.string(),
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
