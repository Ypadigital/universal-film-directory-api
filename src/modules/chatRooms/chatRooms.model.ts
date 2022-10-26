import { model, Schema, Types } from "mongoose";

import { IChatRoom } from "../chatRooms/chatRooms.types";

const chatRoomsSchema = new Schema<IChatRoom>(
  {
    participants: [
      {
        freelancerId: {
          type: Schema.Types.ObjectId,
          default: null,
          ref: "User",
          title: { type: String, required: true },
        },
        contractorId: {
          type: Schema.Types.ObjectId,
          default: null,
          ref: "Contractor",
          title: { type: String, required: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("chatRooms", chatRoomsSchema);
