import { model, Schema } from "mongoose";

import { IProfile } from "../profiles/profiles.types";

const profileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
      title: { type: String, required: true },
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Category id is required"],
        ref: "Category",
      },
    ],
    description: { type: String, default: "" },
    hourlyRate: { type: Number, default: 0 },
    socialLinks: {
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      linkedIn: { type: String, default: "" },
      instagram: { type: String, default: "" },
    },
    overview: String,
    experiences: [
      {
        title: String,
        company: String,
        description: String,
        startDate: String,
        endDate: String,
      },
    ],
    education: [
      {
        title: String,
        school: String,
        description: String,
        startDate: String,
        endDate: String,
      },
    ],
    location: { type: String, default: "" },
    languages: [{ type: String }],
    isDeleted: { date: Date, value: Boolean },
  },
  {
    timestamps: true,
  }
);

export default model("profile", profileSchema);
