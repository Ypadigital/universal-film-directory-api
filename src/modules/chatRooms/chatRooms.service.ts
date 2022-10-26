import jwt from "jsonwebtoken";

import env from "../../config/env";
import ChatRoom from "./chatRooms.model";
import { IChatRoom } from "../chatRooms/chatRooms.types";

class ChatRoomService {
  getAllChatRooms() {
    return ChatRoom.find().select("-__v");
  }

  create(chatRoom: IChatRoom) {
    return ChatRoom.create(chatRoom);
  }

  findById(id: string) {
    return ChatRoom.findById(id);
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return ChatRoom.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return ChatRoom.findByIdAndDelete(id);
  }
}

export default new ChatRoomService();
