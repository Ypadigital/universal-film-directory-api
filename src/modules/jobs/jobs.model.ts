import { model, Schema } from "mongoose";

import { IJob } from "../jobs/jobs.types";

const jobsSchema = new Schema<IJob>(
  {
    contractorId: {
      type: Schema.Types.ObjectId,
      required: [true, "Contractor id is required"],
      ref: "Contractor",
    },
    freelancerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Freelancer id is required"],
      ref: "User",
      title: { type: String, required: true },
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      default: null,
    },
    title: { type: String, required: true },
    rate: {
      type: {
        type: String,
        enum: ["hourly", "fixed"],
        required: [true, "rate.type is required"],
      },
      amount: { type: Number, required: [true, "rate.amount is required"] },
    },
    status: {
      type: String,
      enum: ["Posted", "Ongoing", "Completed", "Cancelled"],
      default: "Posted",
    },
  },

  {
    timestamps: true,
  }
);

export default model("jobs", jobsSchema);
