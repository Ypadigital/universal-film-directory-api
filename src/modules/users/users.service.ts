import jwt from "jsonwebtoken";

import env from "../../config/env";
import User from "./users.model";
import { IUser } from "../../modules/users/users.types";
import { IRegister } from "modules/users/users.types";

class UserService {
  getAllUsers() {
    return User.find().select("-__v").populate({
      path: "skills",
      select: "-__v",
    });
  }

  create(user: IRegister | IUser) {
    return User.create(user);
  }

  findByWallet(wallet: string) {
    return User.findOne({ wallet });
  }

  findById(id: string) {
    return User.findById(id).populate({
      path: "skills",
      select: "-__v",
    });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return User.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return User.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new UserService();
