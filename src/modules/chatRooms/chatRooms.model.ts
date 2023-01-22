import { model, Schema, Types } from "mongoose";

import { IChatRoom } from "../chatRooms/chatRooms.types";

const chatRoomsSchema = new Schema<IChatRoom>(
  {
    participants: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          default: null,
          ref: "User",
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
