import Service from "./services.model";
import { IService } from "../services/services.types";
import { Types } from "mongoose";

class ServiceService {
  getAllServices() {
    return Service.find().select("-__v");
  }

  create(service: IService) {
    return Service.create(service);
  }

  findById(id: string) {
    return Service.findById(id);
  }

  findByFreelancerId(freelancerId: string | Types.ObjectId) {
    return Service.find({ freelancerId });
  }

  findByName(name: string) {
    return Service.findOne({ name });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Service.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Service.findByIdAndDelete(id);
  }
}

export default new ServiceService();
