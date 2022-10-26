import { Schema, model } from "mongoose";

import { IProject } from "./projects.types";

// Update if needed
const projectsSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    tokenId: { type: Number, required: true },
    pricePerFraction: { type: Number, required: true },
    totalSupply: { type: Number, required: true },
    traits: { type: Array, required: true, default: [] },
    curator: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default model("projects", projectsSchema);
