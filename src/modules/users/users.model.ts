import { model, Schema } from "mongoose";

import { IUser } from "../../modules/users/users.types";

const userSchema = new Schema<IUser>(
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
    skills: [
      {
        type: Schema.Types.ObjectId,
        required: [true, "Skill id is required"],
        ref: "skills",
      },
    ],
    jobDescription: String,
    hourlyRate: Number,
    image: String,
    socialLinks: {
      facebook: String,
      twitter: String,
      linkedIn: String,
      dribble: String,
      behance: String,
    },
    overview: String,
    experiences: [
      {
        title: String,
        content: String,
        startDate: String,
        endDate: String,
      },
    ],
    education: [
      {
        title: String,
        content: String,
        startDate: String,
        endDate: String,
      },
    ],
    location: {
      address: String,
      state: String,
      zipcode: String,
      country: String,
    },
    languages: [String],
    // noOfClients: { type: Number, default: 0 },
    // noOfRehires: { type: Number, default: 0 },
    // noOfCompletedJobs: { type: Number, default: 0 },
    // noOfFeedbacks: { type: Number, default: 0 },
    // noOfOngoingJobs: { type: Number, default: 0 },
    isDeleted: { date: Date, value: Boolean },
  },
  {
    timestamps: true,
  }
);

export default model("user", userSchema);
