import { Types } from "mongoose";

export interface IContractor {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
}

export interface IViews {
  _id?: Types.ObjectId;
  views: {
    period: String;
    count?: Number;
  };
}

export interface IDecodedAuth {
  id: string;
  signature: string;
}

export interface IContractorLogin {
  signature: string;
}

export interface IContractorRegister {
  email: string;
  signature: string;
  firstName: string;
  lastName: string;
  wallet?: string;
}
