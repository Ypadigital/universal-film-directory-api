import { NextFunction, Request, Response } from "express";
import { IDecodedAuth } from "modules/users/users.types";

import { UnAuthorizedError } from "../config/errors";
import userService from "../modules/users/users.service";
import contractorService from "../modules/contractors/contractors.service";

const getToken = (req: Request) => req.headers["x-auth-token"];

export const user_authenticate = async function (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) {
  const token = getToken(req);
  if (!token) throw new UnAuthorizedError();
  try {
    const authToken = req.headers["x-auth-token"] as string;
    const decoded = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user = await userService.findById(decoded.id);

    if (!user) throw new UnAuthorizedError();

    req.user = user;
    next();
  } catch (error) {
    const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};

export const contractor_authenticate = async function (
  req: Request & { contractor?: any },
  res: Response,
  next: NextFunction
) {
  const token = getToken(req);
  if (!token) throw new UnAuthorizedError();
  try {
    const authToken = req.headers["x-auth-token"] as string;
    const decoded = contractorService.verifyAuthToken(
      authToken
    ) as IDecodedAuth;
    const contractor = await contractorService.findById(decoded.id);

    if (!contractor) throw new UnAuthorizedError();

    req.contractor = contractor;
    next();
  } catch (error) {
    const errors = ["TokenExpiredError", "NotBeforeError", "JsonWebTokenError"];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};
