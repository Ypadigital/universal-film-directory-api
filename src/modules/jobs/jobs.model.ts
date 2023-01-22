import { model, Schema } from "mongoose";

import { IJob } from "../jobs/jobs.types";

const jobsSchema = new Schema<IJob>(
  {
    contractorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Contractor id is required"],
      ref: "User",
    },
    freelancerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Freelancer id is required"],
      ref: "User",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "services",
      required: [true, "Service id is required"],
    },
    status: {
      type: String,
      enum: ["Pending", "Ongoing", "Completed", "Cancelled"],
      default: "Pending",
    },
    review: { type: String, default: "" },
    rating: { type: Number, default: 0, enum: [0, 1, 2, 3, 4, 5] },
    acceptance: {
      status: { type: Boolean, default: false },
      time: { type: Date, default: null },
    },
  },

  {
    timestamps: true,
  }
);

export default model("jobs", jobsSchema);
