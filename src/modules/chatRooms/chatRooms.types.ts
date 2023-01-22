import { Types } from "mongoose";

export interface IParticipant {
  userId: Types.ObjectId;
}

export interface IChatRoom {
  _id?: Types.ObjectId;
  participants: IParticipant[];
}
