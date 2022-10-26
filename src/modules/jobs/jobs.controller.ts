import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import jobService from "../jobs/jobs.service";

import jobsService from "./jobs.service";
import servicesService from "../../modules/services/services.service";

class JobController {
  async create(req: Request & { contractor: any }, res: Response) {
    req.body.contractorId = req.contractor.id;
    const service = await servicesService.findById(req.body.serviceId);
    if (!service) throw new BadRequestError("Invalid Service Id");
    req.body.rate = service.rate;
    req.body.title = service.title;
    const job = await jobsService.create(req.body);
    res.send(response("Job created successfully", job));
  }

  async createCustomJob(req: Request & { contractor: any }, res: Response) {
    req.body.contractorId = req.contractor.id;

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
}

export default new JobController();
