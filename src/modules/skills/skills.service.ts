import jwt from "jsonwebtoken";

import env from "../../config/env";
import Skill from "./skills.model";
import { ISkill } from "../../modules/skills/skills.types";

class SkillService {
  getAllSkills() {
    return Skill.find().select("-__v");
  }

  create(skill: ISkill) {
    return Skill.create(skill);
  }

  findById(id: string) {
    return Skill.findById(id);
  }

  findAllByIds(ids: string[]) {
    return Skill.find({ _id: { $in: ids } });
  }

  findByName(name: string) {
    return Skill.findOne({ name });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Skill.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Skill.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new SkillService();
