import Joi from "joi";

export const addChatRoomValidator = Joi.object({
  participants: Joi.array()
    .items(
      Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .message("Invalid Participant Id Included")
    )
    .required(),
});
