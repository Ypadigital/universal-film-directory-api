import jwt from "jsonwebtoken";

import env from "../../config/env";
import Profile from "./profiles.model";
import { IProfile } from "../profiles/profiles.types";

class ProfileService {
  create(profile: IProfile) {
    return Profile.create(profile);
  }

  findByUserId(user: string) {
    return Profile.findOne({ user });
  }

  findById(id: string, shouldPopulate = false) {
    if (!shouldPopulate) return Profile.findById(id);

    return Profile.findById(id)
      .populate({
        path: "categories",
        select: "name",
      })
      .populate({
        path: "user",
        select: "firstName lastName",
      });
  }

  findByPeriod(user: string, period: string) {
    return Profile.findOne({ user, "views.period": period });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Profile.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Profile.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new ProfileService();
