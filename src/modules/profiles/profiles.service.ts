import jwt from "jsonwebtoken";

import env from "../../config/env";
import Profile from "./profiles.model";
import { IProfile } from "../profiles/profiles.types";
import _ from "lodash";
import { Types } from "mongoose";

class ProfileService {
  create(profile: IProfile) {
    return Profile.create(profile);
  }

  findByUserId(user: string | IProfile["user"]) {
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
        select: "firstName lastName image",
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

  filterByQuery(filterQuery: { [key: string]: any }): any {
    let keywordRegex = new RegExp("", "i");
    if (filterQuery.keyword) {
      keywordRegex = new RegExp(filterQuery.keyword, "i");
      filterQuery = _.omit(filterQuery, ["keyword"]);
    }
    if (filterQuery.category) {
      filterQuery.categories = { $in: Types.ObjectId(filterQuery.category) };
      delete filterQuery.category;
    }

    return Profile.find({
      $and: [filterQuery],
      $or: [{ description: keywordRegex }],
    }).select("-__v");
  }
}

export default new ProfileService();
