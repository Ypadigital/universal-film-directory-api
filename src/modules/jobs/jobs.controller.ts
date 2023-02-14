import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import jobService from "../jobs/jobs.service";

import jobsService from "./jobs.service";
import servicesService from "../../modules/services/services.service";
import jobsModel from "./jobs.model";

class JobController {
  async create(req: Request & { user: any }, res: Response) {
    const service = await servicesService.findById(req.body.serviceId);
    if (!service) throw new BadRequestError("Invalid Service Id");
    req.body.contractorId = req.user._id;
    req.body.freelancerId = service.freelancerId;
    const job = await jobsService.create(req.body);
    res.send(response("Job created successfully", job));
  }

  async createCustomJob(req: Request & { user: any }, res: Response) {
    req.body.contractorId = req.user.id;

    const job = await jobsService.create(req.body);
    res.send(response("Job created successfully", job));
  }

  async getAllJobs(req: Request, res: Response) {
    const jobs = await jobsService.getAllJobs();

    res.send(response("Job retrieved successfully", jobs));
  }

  async getJobById(req: Request, res: Response) {
    const job = await jobsService.findById(req.params.id);

    res.send(response("Jobs retrieved successfully", job));
  }

  async updateJob(req: Request & { job: any }, res: Response) {
    const update = req.body;
    const id = req.job.id;
    const updatedJob = await jobService.update(id, update);
    if (!updatedJob) throw new BadRequestError("Invalid Job");

    res.send(response("Job was updated successfully", updatedJob));
  }

  async randomUpdate(req: Request & { job: any }, res: Response) {
    const updatedJob = await jobsModel.updateMany(
      {},
      { freelancerId: "635a8d651c25a520b070b7e2" }
    );
    // if (!updatedJob) throw new BadRequestError("Invalid Job");

    res.send(response("Job was updated successfully"));
  }
}

export default new JobController();
