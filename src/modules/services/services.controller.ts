import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import serviceService from "../services/services.service";

import servicesService from "./services.service";
import { IUser } from "modules/users/users.types";
import { uploadToCloud } from "../../lib/cloudinary";
import servicesModel from "./services.model";

class ServiceController {
  async create(req: Request & { user: any }, res: Response) {
    req.body.freelancerId = req.user.id;
    const service = await servicesService.create(req.body);
    res.send(response("Service created successfully", service));
  }

  async getAllServices(req: Request, res: Response) {
    const services = await servicesService.getAllServices();

    res.send(response("Services retrieved successfully", services));
  }

  async filterServices(req: Request, res: Response) {
    const { query } = req;
    const services = await servicesModel.find().populate("freelancerId");
    console.log(services, query);

    res.send(response("Services retrieved successfully", services));
  }

  async getServiceById(req: Request, res: Response) {
    const service = await servicesService.findById(req.params.id);

    res.send(response("Services retrieved successfully", service));
  }

  async updateService(req: Request & { service: any }, res: Response) {
    const update = req.body;
    const id = req.params.id;
    const updatedService = await serviceService.update(id, update);
    if (!updatedService) throw new BadRequestError("Invalid Service");

    res.send(response("Service was updated successfully", updatedService));
  }
}

export default new ServiceController();
