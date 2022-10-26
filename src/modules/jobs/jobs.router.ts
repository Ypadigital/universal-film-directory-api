const router = require("express").Router();

import { contractor_authenticate } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import jobController from "../jobs/jobs.controller";
import { addCustomJobValidator, addJobValidator } from "./jobs.validators";

router.get("/jobs", jobController.getAllJobs);
router.get("/jobs/:id", jobController.getJobById);

router.post(
  "/jobs",
  [contractor_authenticate, validateBy(addJobValidator)],
  jobController.create
);

router.post(
  "/jobs/custom",
  [contractor_authenticate, validateBy(addCustomJobValidator)],
  jobController.createCustomJob
);

export default router;
