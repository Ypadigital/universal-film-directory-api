import { Types } from "mongoose";

export interface IJob {
  _id?: Types.ObjectId;
  contractorId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  title: string;
  rate: {
    type: "hourly" | "fixed";
    amount: number;
  };
  status?: "Posted" | "Ongoing" | "Completed" | "Cancelled";
}
