import { IViews } from "../profiles/profiles.types";
import Views from "./views.model";

class ViewsService {
  getAllViews() {
    return Views.find().select("-__v");
  }

  create(profileId: string, period: string) {
    return Views.create({ profileId, views: { period } });
  }

  findByPeriod(profileId: string, period: string) {
    return Views.findOne({ profileId, "views.period": period });
  }

  findById(id: string) {
    return Views.findById(id);
  }

  updateViewCount(profileId: string, period: string) {
    return Views.findOneAndUpdate(
      { profileId, "views.period": period },
      { $inc: { "views.$.count": 1 } },
      { new: true }
    );
  }

  findProfileViews(profileId: string) {
    return Views.findOne({ profileId });
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Views.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Views.findByIdAndDelete(id);
  }
}

export default new ViewsService();
