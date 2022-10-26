import { Types } from "mongoose";

export interface IImage {
  url: string;
  public_id: string;
  size: number;
  filename: string;
  type: string;
}

export interface IService {
  _id?: Types.ObjectId;
  freelancerId: Types.ObjectId;
  images: IImage[];
  rate: {
    type: "hourly" | "fixed";
    amount: number;
  };
  duration: {
    type: "month" | "week" | "day" | "hour";
    amount: number;
  };
  overview: string;
}
