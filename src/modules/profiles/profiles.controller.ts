import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import viewService from "../profiles/views.service";

import { IProfile } from "../profiles/profiles.types";
import { getMonthAndYearFromDate } from "../../utils/dateHelpers";
import categoriesService from "../categories/categories.service";
import servicesService from "../services/services.service";
import profilesService from "./profiles.service";
import profilesModel from "./profiles.model";
import jobsService from "../../modules/jobs/jobs.service";
import { getJobMeta } from "../../utils/helpers";
import { IJob } from "modules/jobs/jobs.types";

class UserController {
  async createProfile(req: Request & { user: any }, res: Response) {
    const profile: IProfile = req.body;
    profile.user = req.user.id;
    const existingProfile = await profilesService.findByUserId(profile.user);
    if (existingProfile) throw new BadRequestError("Profile already exists");
    const newProfile = await profilesService.create(profile);
    if (!newProfile) throw new BadRequestError("Invalid Profile");

    res.send(response("Profile was created successfully", newProfile));
  }

  async getProfile(req: Request, res: Response) {
    const { id } = req.params;
    const profile = await profilesService
      .findById(id, true)
      .select("-__v")
      .lean();
    if (!profile) throw new BadRequestError("Invalid Profile");
    const jobs = await jobsService.findUserJobs(profile.user);
    const jobsMeta = getJobMeta(jobs);
    const ratings = jobs
      .filter((job: IJob) => job.status === "Completed" && job.rating)
      .map((j: IJob) => j.rating);
    const services = await servicesService.findByFreelancerId(profile.user);

    res.send(
      response("Profile retrieved successfully", {
        ...profile,
        ...jobsMeta,
        services,
        ratings,
      })
    );
  }

  async getManyProfiles(req: Request, res: Response) {
    let profiles = await profilesModel
      .find()
      .populate("user")
      .populate("categories")
      .select("-__v")
      .lean();
    profiles = profiles.filter((profile: any) => !profile.user.isContractor);
    const jobs = await jobsService.getAllJobs();
    const services = await servicesService
      .getAllServices()
      .populate("freelancerId categoryId");
    const freelancerProfiles = profiles.map((profile: any) => {
      const freelancerJobs = jobs.filter((job: any) => {
        if (job.freelancerId._id.toString() === profile.user._id.toString()) {
          return true;
        } else {
          return false;
        }
      });
      const freelancerServices = services.filter(
        (service: any) =>
          service.freelancerId._id.toString() === profile.user._id.toString()
      );
      const jobsMeta = getJobMeta(freelancerJobs);
      const ratings = freelancerJobs
        .filter((job: any) => job.status === "Completed" && job.rating)
        .map((j: any) => j.rating);
      return {
        ...profile,
        ratings,
        ...jobsMeta,
        services: freelancerServices,
      };
    });

    res.send(response("Profile retrieved successfully", freelancerProfiles));
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

    const profile = await profilesService.findById(id);
    if (!profile) throw new BadRequestError("Invalid Profile");
    const updatedViews = await viewService.updateViewCount(id, period);
    if (!updatedViews) await viewService.create(profile.id, period);

    res.send(response("Profile views updated successfully"));
  }

  async updateProfile(req: Request & { user: any }, res: Response) {
    const update = req.body;
    const id = req.user._id;
    const profile = await profilesService.findByUserId(id);
    if (!profile) throw new BadRequestError("Invalid Profile");
    if (update.categories) {
      const categories = await categoriesService.findAllByIds(
        update.categories
      );
      if (categories.length !== update.categories.length)
        throw new BadRequestError("Invalid Category Id Included");
    }
    const updatedProfile = await profilesService.update(profile.id, update);
    if (!updatedProfile) throw new BadRequestError("Invalid Profile");

    res.send(response("Profile was updated successfully", updatedProfile));
  }
  async getSearchResults(req: Request, res: Response) {
    const query = req.query;

    const results = await profilesService
      .filterByQuery({
        ...query,
      })
      .populate("user categories")
      .lean();
    const userIds = results.map((r: any) => r.user._id);
    const jobs = await jobsService.findJobsByUserIds(userIds);
    const getProfileRatings = (userId: string) => {
      const userJobs = jobs.filter(
        (job: any) => job.freelancerId.toString() === userId
      );
      const ratings = userJobs
        .filter((job: IJob) => job.status === "Completed" && job.rating)
        .map((j: IJob) => j.rating);
      return ratings;
    };
    const finalResults = results.map((r: any) => {
      const ratings = getProfileRatings(r.user._id.toString());
      return {
        ...r,
        ratings,
      };
    });

    res.send(response("Stars retrieved Successfully", finalResults));
  }
}

export default new UserController();
