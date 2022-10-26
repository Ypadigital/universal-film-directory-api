import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { BadRequestError } from "../config/errors";

function validateById() {
  const paramId = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({ "string.pattern.base": "Invalid id" })
      .required(),
  });

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = paramId.validate(req.params);
    if (!error) return next();

    const errors = error.details.map((error) => error.message);

    if (errors && errors.length > 0) throw new BadRequestError(errors[0]);
    next();
  };
}

export default validateById;
