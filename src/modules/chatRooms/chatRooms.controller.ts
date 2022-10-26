import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import chatRoomService from "../chatRooms/chatRooms.service";

import chatRoomsService from "./chatRooms.service";

class ChatRoomController {
  async create(req: Request, res: Response) {
    const chatRoom = await chatRoomsService.create(req.body);
    res.send(response("ChatRoom created successfully", chatRoom));
  }

  async getAllChatRooms(req: Request, res: Response) {
    const chatRooms = await chatRoomsService.getAllChatRooms();

    res.send(response("ChatRoom retrieved successfully", chatRooms));
  }

  async getChatRoomById(req: Request, res: Response) {
    const chatRoom = await chatRoomsService.findById(req.params.id);

    res.send(response("ChatRooms retrieved successfully", chatRoom));
  }

  async updateChatRoom(req: Request & { chatRoom: any }, res: Response) {
    const update = req.body;
    const id = req.chatRoom.id;
    const updatedChatRoom = await chatRoomService.update(id, update);
    if (!updatedChatRoom) throw new BadRequestError("Invalid ChatRoom");

    res.send(response("ChatRoom was updated successfully", updatedChatRoom));
  }
}

export default new ChatRoomController();
