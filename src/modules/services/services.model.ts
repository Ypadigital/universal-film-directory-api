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
    categoryId: {
      type: Schema.Types.ObjectId,
      required: [true, "Category id is required"],
      ref: "Category",
    },
    images: [{ type: String }],
    rate: {
      type: {
        type: String,
        enum: ["month", "week", "day", "hour"],
        required: [true, "rate.type is required"],
      },
      amount: { type: Number, required: [true, "rate.amount is required"] },
    },
    overview: { type: String, required: true },
    link: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default model("services", servicesSchema);
