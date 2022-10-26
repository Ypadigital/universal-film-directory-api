import { model, Schema } from "mongoose";

import { IContractor } from "../contractors/contractors.types";

const contractorSchema = new Schema<IContractor>(
  {
    wallet: { type: String, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: 5,
      maxlength: 255,
      trim: true,
    },
    firstName: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
      default: "",
      required: true,
    },
    lastName: {
      type: String,
      minlength: 2,
      maxlength: 255,
      trim: true,
      required: true,
    },
    jobDescription: String,
    image: String,
    location: {
      address: String,
      state: String,
      zipcode: String,
      country: String,
    },
    isDeleted: { date: Date, value: Boolean },
  },
  {
    timestamps: true,
  }
);

export default model("contractor", contractorSchema);
