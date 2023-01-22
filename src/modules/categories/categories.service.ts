import jwt from "jsonwebtoken";

import env from "../../config/env";
import Category from "./categories.model";
import { ICategory } from "./categories.types";

class CategoryService {
  getAllCategories() {
    return Category.find().select("-__v");
  }

  create(category: ICategory) {
    return Category.create(category);
  }

  findById(id: string) {
    return Category.findById(id);
  }

  findAllByIds(ids: string[]) {
    return Category.find({ _id: { $in: ids } });
  }

  findByName(name: string) {
    return Category.findOne({ name });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Category.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Category.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new CategoryService();
