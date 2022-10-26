import jwt from "jsonwebtoken";

import Contractor from "./contractors.model";
import { IContractor } from "../contractors/contractors.types";
import { IContractorRegister } from "modules/contractors/contractors.types";
import env from "../../config/env";

class ContractorService {
  getAllContractors() {
    return Contractor.find().select("-__v");
  }

  create(user: IContractorRegister | IContractor) {
    return Contractor.create(user);
  }

  findByWallet(wallet: string) {
    return Contractor.findOne({ wallet });
  }

  findById(id: string) {
    return Contractor.findById(id);
  }

  update(id: string, updateQuery: { [key: string]: any }) {
    return Contractor.findByIdAndUpdate(id, updateQuery, { new: true });
  }

  delete(id: string) {
    return Contractor.findByIdAndDelete(id);
  }

  verifyAuthToken(token: string) {
    return jwt.verify(token, env.JWT_SECRET_KEY);
  }
}

export default new ContractorService();
