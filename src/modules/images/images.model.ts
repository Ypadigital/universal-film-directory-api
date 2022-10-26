import { Schema, model } from "mongoose";

import { IImage } from "./images.types";

// Update if needed
const imagesSchema = new Schema<IImage>(
  {
    url: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    public_id: { type: String },
    filename: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("images", imagesSchema);
