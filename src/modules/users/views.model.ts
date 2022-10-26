import { model, Schema } from "mongoose";

import { IViews } from "../../modules/users/users.types";

const viewsSchema = new Schema<IViews>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id is required"],
      ref: "User",
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
