import jwt from "jsonwebtoken";

import env from "../../config/env";
import Job from "./jobs.model";
import { IJob } from "../jobs/jobs.types";

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

  findUserJobs(freelancerId: string) {
    return Job.find({ freelancerId });
  }

  findContractorJobs(contractorId: string) {
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
