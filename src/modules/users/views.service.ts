import { IViews } from "../../modules/users/users.types";
import Views from "./views.model";

class ViewsService {
  getAllViews() {
    return Views.find().select("-__v");
  }

  create(userId: string, period: string) {
    return Views.create({ userId, views: { period } });
  }

  findByPeriod(userId: string, period: string) {
    return Views.findOne({ userId, "views.period": period });
  }

  findById(id: string) {
    return Views.findById(id);
  }

  updateViewCount(userId: string, period: string) {
    return Views.findOneAndUpdate(
      { userId, "views.period": period },
      { $inc: { "views.$.count": 1 } },
      { new: true }
    );
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Views.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Views.findByIdAndDelete(id);
  }
}

export default new ViewsService();
