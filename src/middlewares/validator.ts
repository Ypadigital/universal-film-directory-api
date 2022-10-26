import { NextFunction, Request, Response } from "express";
import { AnySchema } from "joi";

const { BadRequestError } = require("../config/errors");

const validator = (schema: AnySchema, source: "query" | "body" = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validate(req[source] || {}, schema);

    if (errors && errors.length > 0) throw new BadRequestError(errors[0]);

    next();
  };
};

function validate(data: any, schema: AnySchema) {
  const { error } = schema.validate(data);

  if (!error) return;
  return error.details.map((error) => error.message);
}

export default validator;
