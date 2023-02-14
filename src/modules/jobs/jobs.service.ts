import jwt from "jsonwebtoken";

import env from "../../config/env";
import Job from "./jobs.model";
import { IJob } from "../jobs/jobs.types";
import { Types } from "mongoose";

class JobService {
  getAllJobs() {
    return Job.find().select("-__v");
  }

  create(job: IJob) {
    return Job.create(job);
  }

  findById(id: string) {
    return Job.findById(id);
  }

  findAllByIds(ids: string[]) {
    return Job.find({ _id: { $in: ids } });
  }

  findUserJobs(userId: Types.ObjectId) {
    if (typeof userId === "string") userId = Types.ObjectId(userId);
    return Job.find({
      $or: [{ freelancerId: userId }, { contractorId: userId }],
    });
  }

  findJobsByUserIds(freelancerIds: string[]) {
    return Job.find({ freelancerId: { $in: freelancerIds } });
  }

  findContractorJobs(contractorId: string | Types.ObjectId) {
    return Job.find({ contractorId });
  }

  findByName(name: string) {
    return Job.findOne({ name });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Job.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Job.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new JobService();
