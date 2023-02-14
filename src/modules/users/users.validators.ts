import Joi from "joi";

export const updateUser = Joi.object({
  firstName: Joi.string().min(2).max(255),
  lastName: Joi.string().min(2).max(255),
  email: Joi.string().email(),
});

export const signUp = Joi.object({
  firstName: Joi.string().min(2).max(255),
  lastName: Joi.string().min(2).max(255),
  email: Joi.string().email().required(),
  signature: Joi.string().required(),
  role: Joi.string().valid("freelancer", "contractor"),
});

export const login = Joi.object({
  signature: Joi.string().min(2).max(255),
});

export const updateProfile = Joi.object({
  firstName: Joi.string().min(2).max(255).trim(),
  lastName: Joi.string().min(2).max(255).trim(),
  email: Joi.string().email().trim(),
  image: Joi.string().trim(),
  description: Joi.string().trim(),
  experiences: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string(),
      company: Joi.string(),
      description: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
  ),
  education: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string().trim(),
      school: Joi.string().trim(),
      description: Joi.string().trim(),
      startDate: Joi.date(),
      endDate: Joi.date(),
    })
  ),
  categories: Joi.array().items(Joi.string().trim()),
  location: Joi.string(),
  socialLinks: Joi.object({
    facebook: Joi.string().trim(),
    twitter: Joi.string().trim(),
    linkedIn: Joi.string().trim(),
    instragram: Joi.string().trim(),
  }),
  overview: Joi.string().trim(),
  languages: Joi.array().items(Joi.string().trim()),
});
