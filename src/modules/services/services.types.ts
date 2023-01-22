import { Types } from "mongoose";

export interface IService {
  _id?: Types.ObjectId;
  freelancerId: Types.ObjectId;
  categoryId: Types.ObjectId;
  images: string[];
  rate: {
    type: "hour" | "month" | "week" | "day";
    amount: number;
  };
  overview: string;
  link?: string;
}
