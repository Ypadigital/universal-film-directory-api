import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  isContractor: boolean;
}

export interface IDecodedAuth {
  id: string;
  signature: string;
}

export interface ILogin {
  signature: string;
}

export interface IRegister {
  email: string;
  signature: string;
  firstName: string;
  lastName: string;
  isContractor?: boolean;
  wallet?: string;
}
