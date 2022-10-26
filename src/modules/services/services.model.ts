import { model, Schema } from "mongoose";

import { IService } from "../services/services.types";

const servicesSchema = new Schema<IService>(
  {
    title: { type: String },
    freelancerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Freelancer id is required"],
      ref: "User",
      title: { type: String, required: true },
    },
    images: [
      {
        url: { type: String, required: [true, "Images.url is required"] },
        public_id: {
          type: String,
          required: [true, "Images.public_id is required"],
        },
        size: { type: Number, required: [true, "Images.size is required"] },
        filename: {
          type: String,
          required: [true, "Images.filename is required"],
        },
        type: { type: String, required: [true, "Images.type is required"] },
      },
    ],
    rate: {
      type: {
        type: String,
        enum: ["hourly", "fixed"],
        required: [true, "rate.type is required"],
      },
      amount: { type: Number, required: [true, "rate.amount is required"] },
    },
    duration: {
      type: {
        type: String,
        enum: ["month", "week", "day", "hour"],
        required: [true, "duration.type is required"],
      },
      amount: { type: Number, required: [true, "duration.amount is required"] },
    },
    overview: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("services", servicesSchema);
