import { model, Schema } from "mongoose";

import { ISkill } from "../../modules/skills/skills.types";

const skillsSchema = new Schema<ISkill>(
  {
    name: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

export default model("skills", skillsSchema);
