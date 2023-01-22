import { NextFunction, Request, Response } from "express";
import { IDecodedAuth, IUser } from "../modules/users/users.types";

import { UnAuthorizedError } from "../config/errors";
import userService from "../modules/users/users.service";

const getToken = (req: Request) => req.headers["x-auth-token"];

export const authenticate = async function (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) {
  const token = getToken(req);
  if (!token) throw new UnAuthorizedError();
  try {
    const authToken = req.headers["x-auth-token"] as string;
    console.log({ authToken, role: "Authenticate" });
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

export const onlyFreelancers = async function (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) {
  const token = getToken(req);
  if (!token) throw new UnAuthorizedError();
  try {
    const authToken = req.headers["x-auth-token"] as string;
    console.log({ authToken, role: "Freelancers" });

    const decoded = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user = await userService.findById(decoded.id);
    if (!user || user.isContractor) throw new UnAuthorizedError();

    req.user = user;
    next();
  } catch (error) {
    const errors = [
      "TokenExpiredError",
      "NotBeforeError",
      "JsonWebTokenError",
      // "invalid token",
      // "jwt malformed",
    ];
    if (errors.includes(error?.name)) {
      throw new UnAuthorizedError();
    }
    next(error);
  }
};

export const onlyContractors = async function (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) {
  const token = getToken(req);
  if (!token) throw new UnAuthorizedError();
  try {
    const authToken = req.headers["x-auth-token"] as string;
    console.log({ authToken, role: "Contractor" });

    const decoded = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user = await userService.findById(decoded.id);

    if (!user || !user.isContractor) throw new UnAuthorizedError();

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
