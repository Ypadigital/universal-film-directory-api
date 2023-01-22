import Joi from "joi";

export const updateProfile = Joi.object({
  experiences: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string(),
      company: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      description: Joi.string(),
    })
  ),
  education: Joi.array().items(
    Joi.object({
      _id: Joi.string(),
      title: Joi.string(),
      school: Joi.string(),
      startDate: Joi.date(),
      endDate: Joi.date(),
      description: Joi.string(),
    })
  ),
  categories: Joi.array().items(
    Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .message("Invalid Category Id Included")
  ),
  location: Joi.string(),
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
  description: Joi.string(),
});
