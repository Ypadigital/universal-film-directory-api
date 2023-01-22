import { Request, Response } from "express";
import { ethers } from "ethers";

import response from "../../utils/response";
import { generateAuthToken } from "../../utils/token";

import { BadRequestError } from "../../config/errors";

import userService from "../../modules/users/users.service";

import {
  IDecodedAuth,
  ILogin,
  IRegister,
  IUser,
} from "../../modules/users/users.types";

import profilesService from "../../modules/profiles/profiles.service";
import env from "../../config/env";
import jobsService from "../../modules/jobs/jobs.service";
import { IJob } from "../../modules/jobs/jobs.types";
import viewsService from "../../modules/profiles/views.service";
import { omit, pick } from "../../utils/lodash";
import { getLastMonths } from "../../utils/dateHelpers";
import servicesService from "../../modules/services/services.service";
import { getJobMeta } from "../../utils/helpers";

class UserController {
  async register(req: Request, res: Response) {
    const credentials = req.body as IRegister;
    const message = env.ETHERS_MSG;

    try {
      const wallet = ethers.utils.verifyMessage(message, credentials.signature);
      credentials.wallet = wallet;
    } catch (error) {
      throw new BadRequestError("Invalid Signature");
    }

    const user: IUser = await userService.create(credentials);
    if (!user.isContractor) await profilesService.create({ user: user._id });

    const authToken = generateAuthToken(user);

    res.send(
      response(
        `${user.isContractor ? "Contractor" : "User"} created successfully`,
        authToken
      )
    );
  }

  async login(req: Request, res: Response) {
    const { signature } = req.body as ILogin;
    const message = env.ETHERS_MSG;

    try {
      const wallet = ethers.utils.verifyMessage(message, signature);
      const user = await userService.findByWallet(wallet);
      if (!user) throw new BadRequestError("Invalid User");
      const authToken = generateAuthToken(user);

      res.send(response("User retrieved successfully", { user, authToken }));
    } catch (error) {
      throw new BadRequestError("Invalid Login");
    }
  }

  async getUserDetails(req: Request, res: Response) {
    const authToken = req.headers["x-auth-token"] as string;
    console.log({ authToken, role: "getUserDetails" });
    const decodedData = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user: any = await userService
      .findById(decodedData.id)
      .select("-__v")
      .lean();
    if (!user) throw new BadRequestError("Invalid User");
    const profile = await profilesService
      .findByUserId(user._id)
      .populate("categories")
      .select("-__v -user -createdAt -updatedAt")
      .lean();

    if (!profile) throw new BadRequestError("Invalid Profile");
    let jobs = [];
    if (!user.isContractor) {
      jobs = await jobsService.findUserJobs(user._id);
    } else {
      jobs = await jobsService.findContractorJobs(user._id);
    }
    const reviews = jobs.filter((job: IJob) => job.review);
    const jobMeta = getJobMeta(jobs);
    const profileViews = await viewsService
      .findProfileViews(profile._id)
      .lean();
    const views = profileViews?.views || [];

    const viewsInLastMonths = (x: number) => {
      return getLastMonths(x).map((month) => {
        const view = views.find((view: any) => view.period === month.key);
        return { x: month.label, y: view ? view.count : 0 };
      });
    };

    const services = await servicesService.findByFreelancerId(user._id).lean();

    res.send(
      response("User retrieved successfully", {
        ...user,
        ...omit(profile, ["_id"]),
        views: { six: viewsInLastMonths(6), twelve: viewsInLastMonths(12) },
        jobs,
        reviews,
        ...jobMeta,
        services,
      })
    );
  }

  async getUserJobs(req: Request, res: Response) {
    const authToken = req.headers["x-auth-token"] as string;
    const decodedData = userService.verifyAuthToken(authToken) as IDecodedAuth;
    const user: any = await userService
      .findById(decodedData.id)
      .select("-__v")
      .lean();
    if (!user) throw new BadRequestError("Invalid User");
    let jobs = [];
    if (!user.isContractor) {
      jobs = await jobsService
        .findUserJobs(user._id)
        .populate({
          path: "serviceId",
          populate: {
            path: "categoryId",
          },
        })
        .populate("contractorId")
        .populate("freelancerId")
        .populate("categoryId")
        .lean();
    } else {
      jobs = await jobsService
        .findContractorJobs(user._id)
        .populate({
          path: "serviceId",
          populate: {
            path: "categoryId",
          },
        })
        .populate("contractorId")
        .populate("freelancerId")
        .populate("categoryId")
        .lean();
    }

    res.send(response("User jobs retrieved successfully", jobs));
  }

  async getUsers(req: Request, res: Response) {
    const users: IUser[] = await userService.getAllUsers();

    res.send(response("Users retrieved successfully", users));
  }

  async updateUser(req: Request & { user: any }, res: Response) {
    const update = req.body;
    const id = req.user.id;

    const updatedUser = await userService.update(id, update);
    if (!updatedUser) throw new BadRequestError("Invalid User");

    res.send(response("User was updated successfully", updatedUser));
  }

  async updateProfile(req: Request & { user: any }, res: Response) {
    const update = req.body;
    const id = req.user.id;
    const userFields = ["firstName", "lastName", "email", "image"];
    const userUpdate = pick(update, userFields);
    const socialLinks = pick(update, [
      "facebook",
      "twitter",
      "linkedIn",
      "instagram",
    ]);
    const profileData: any = {
      ...omit(update, [...Object.keys(socialLinks), ...userFields]),
    };

    if (Object.keys(socialLinks).length > 0)
      profileData.socialLinks = socialLinks;

    const updatedUser = await userService.update(id, userUpdate);
    if (!updatedUser) throw new BadRequestError("Invalid User");

    const profile = await profilesService.findByUserId(id);
    const updatedProfile = await profilesService.update(
      profile._id,
      profileData
    );
    if (!updatedProfile) throw new BadRequestError("Invalid Profile");

    res.send(response("User's profile was updated successfully"));
  }
}

export default new UserController();
