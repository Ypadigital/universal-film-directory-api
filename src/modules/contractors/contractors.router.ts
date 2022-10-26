const router = require("express").Router();

import { contractor_authenticate } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import contractorsController from "../contractors/contractors.controller";
import { login, signUp, updateContractor } from "./contractors.validators";

router.get("/contractors/me", contractorsController.getContractorFromJwt);
router.post(
  "/contractors/register",
  validateBy(signUp),
  contractorsController.register
);
router.post(
  "/contractors/login",
  validateBy(login),
  contractorsController.login
);
router.put(
  "/contractors",
  [contractor_authenticate, validateBy(updateContractor)],
  contractorsController.updateContractor
);

export default router;
