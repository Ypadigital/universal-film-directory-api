import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
}

export interface IEducation {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface IExperience {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
}

export interface IProfile {
  _id?: Types.ObjectId;
  user: any;
  categories?: Types.ObjectId[];
  education?: IEducation[];
  experiences?: IExperience[];
  langauges?: string[];
  location?: {
    address: string;
    state: string;
    zipcode: string;
    country: string;
  };
  socialLinks?: {
    facebook: string;
    twitter: string;
    linkedIn: string;
    dribble: string;
    behance: string;
  };
  overview?: string;
  hourlyRate?: number;
  image?: string;
}

export interface IViews {
  _id?: Types.ObjectId;
  views: {
    period: String;
    count: Number;
  };
}
