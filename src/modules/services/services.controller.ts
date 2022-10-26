import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import serviceService from "../services/services.service";

import servicesService from "./services.service";
import { IUser } from "modules/users/users.types";
import { uploadToCloud } from "../../lib/cloudinary";
import { IImage } from "./services.types";

class ServiceController {
  async create(req: Request & { user: any }, res: Response) {
    try {
      req.body.rate = JSON.parse(req.body.rate);
      req.body.duration = JSON.parse(req.body.duration);
    } catch (error) {
      throw new BadRequestError("Invalid Data Submitted");
    }
    const images = [] as IImage[];
    for (const file of req.files as Express.Multer.File[]) {
      const upload = await uploadToCloud(file.path);
      const image = {
        url: upload.secure_url,
        size: upload.bytes,
        public_id: upload.public_id,
        filename: upload.original_filename,
        type: upload.format,
      };
      images.push(image);
    }
    req.body.images = images;
    req.body.freelancerId = req.user.id;

    const service = await servicesService.create(req.body);
    res.send(response("Service created successfully", service));
  }

  async getAllServices(req: Request, res: Response) {
    const services = await servicesService.getAllServices();

    res.send(response("Services retrieved successfully", services));
  }

  async getServiceById(req: Request, res: Response) {
    const service = await servicesService.findById(req.params.id);

    res.send(response("Services retrieved successfully", service));
  }

  async updateService(req: Request & { service: any }, res: Response) {
    const update = req.body;
    const id = req.service.id;
    const updatedService = await serviceService.update(id, update);
    if (!updatedService) throw new BadRequestError("Invalid Service");

    res.send(response("Service was updated successfully", updatedService));
  }
}

export default new ServiceController();
