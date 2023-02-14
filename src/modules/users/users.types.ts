import { IProfile } from "modules/profiles/profiles.types";
import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  role: "freelancer" | "contractor";
  profile?: Types.ObjectId | IProfile;
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
  role: "freelancer" | "contractor";
  wallet?: string;
}
