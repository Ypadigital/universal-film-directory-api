import { Request, Response } from "express";
import { ethers } from "ethers";

import response from "../../utils/response";
import { generateAuthToken } from "../../utils/token";

import { BadRequestError } from "../../config/errors";

import userService from "../../modules/users/users.service";
import viewService from "../../modules/users/views.service";

import {
  IDecodedAuth,
  ILogin,
  IRegister,
  IUser,
} from "../../modules/users/users.types";
import { getMonthAndYearFromDate } from "../../utils/dateHelpers";
import skillsService from "../../modules/skills/skills.service";
import servicesService from "../../modules/services/services.service";
import omit from "lodash.omit";

class UserController {
  async register(req: Request, res: Response) {
    const credentials = req.body as IRegister;
    const message =
      "MServices wants you to confirm your identity, please sign this message to proceed.";

    try {
      credentials.wallet = ethers.utils.verifyMessage(
        message,
        credentials.signature
      );
    } catch (error) {
      throw new BadRequestError("Invalid Signature");
    }

    const user = await userService.create(credentials);
    const authToken = generateAuthToken(user);

    res.send(response("User created successfully", authToken));
  }

  async login(req: Request, res: Response) {
    const { signature } = req.body as ILogin;
    const message =
      "MServices wants you to confirm your identity, please sign this message to proceed.";

    try {
      const wallet = ethers.utils.verifyMessage(message, signature);
      const user = await userService.findByWallet(wallet);
      if (!user) throw new BadRequestError("Invalid User");
      const authToken = generateAuthToken(user);

      res.send(response("User retrieved successfully", authToken));
    } catch (error) {
      throw new BadRequestError("Invalid Signature");
    }
  }

  async getUserFromJwt(req: Request, res: Response) {
    const authToken = req.headers["x-auth-token"] as string;
    const decodedData = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user: IUser = await userService
      .findById(decodedData.id)
      .select("-__v");
    if (!user) throw new BadRequestError("Invalid User");

    res.send(response("User retrieved successfully", user));
  }

  async getUsers(req: Request, res: Response) {
    const users: IUser[] = await userService.getAllUsers();

    res.send(response("Users retrieved successfully", users));
  }

  async getUserProfile(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.findById(id).select("-__v").lean();
    if (!user) throw new BadRequestError("Invalid User");
    const services = await servicesService.findByFreelancerId(user._id);

    res.send(response("User retrieved successfully", { ...user, services }));
  }

  async getUserServices(req: Request, res: Response) {
    const { id } = req.params;
    const services = await servicesService.findByFreelancerId(id);

    res.send(response("Services retrieved successfully", services));
  }

  async addProfileView(req: Request, res: Response) {
    const { id } = req.params;
    const today = new Date();
    const period = getMonthAndYearFromDate(today);

    const updatedView = await viewService.updateViewCount(id, period);
    if (!updatedView) await viewService.create(id, period);

    res.send(response("Profile views updated successfully"));
  }

  async updateUser(req: Request & { user: any }, res: Response) {
    const update = req.body;
    const id = req.user.id;
    if (update.skills) {
      const skills = await skillsService.findAllByIds(update.skills);
      if (skills.length !== update.skills.length)
        throw new BadRequestError("Invalid Skill Id Included");
    }
    const updatedUser = await userService.update(id, update);
    if (!updatedUser) throw new BadRequestError("Invalid User");

    res.send(response("User was updated successfully", updatedUser));
  }
}

export default new UserController();
