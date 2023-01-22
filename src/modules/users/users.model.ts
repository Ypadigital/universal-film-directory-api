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
    isContractor: { type: Boolean, default: false },
    image: {
      type: String,
      required: true,
      default: "https://telegram.im/img/nnashenasbot",
    },
    isDeleted: { date: Date, value: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default model("User", userSchema);
