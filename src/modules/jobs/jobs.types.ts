import { Types } from "mongoose";

export interface IJob {
  _id?: Types.ObjectId;
  contractorId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  serviceId: Types.ObjectId;
  title: string;
  rate: {
    type: "hour" | "month" | "week" | "day";
    amount: number;
  };
  status?: "Pending" | "Ongoing" | "Completed" | "Cancelled";
  review?: string;
  rating?: number;
}
