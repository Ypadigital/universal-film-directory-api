const router = require("express").Router();

import validateBy from "../../middlewares/validator";
import chatRoomController from "../chatRooms/chatRooms.controller";
import { addChatRoomValidator } from "./chatRooms.validators";

router.get("/chatRooms", chatRoomController.getAllChatRooms);
router.get("/chatRooms/:id", chatRoomController.getChatRoomById);

router.post("/chatRooms", validateBy(addChatRoomValidator), chatRoomController.create);

export default router;
