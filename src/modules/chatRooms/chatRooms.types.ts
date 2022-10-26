import { Types } from "mongoose";

export interface IParticipant {
  type: "freelancer" | "contractor";
  id: Types.ObjectId;
}

export interface IChatRoom {
  _id?: Types.ObjectId;
  participants: IParticipant[];
}
