import { model, Schema } from "mongoose";

import { IViews } from "../profiles/profiles.types";

const viewsSchema = new Schema<IViews>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      required: [true, "Profile id is required"],
      ref: "Profile",
    },
    views: [
      {
        period: String,
        count: { type: Number, default: 1, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("views", viewsSchema);
