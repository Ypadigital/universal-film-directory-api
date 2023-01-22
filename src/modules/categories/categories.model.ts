import { model, Schema } from "mongoose";

import { ICategory } from "./categories.types";

const categoriesSchema = new Schema<ICategory>(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);


export default model("Category", categoriesSchema);
