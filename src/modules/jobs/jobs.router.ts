const router = require("express").Router();

import { onlyContractors } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import jobController from "../jobs/jobs.controller";
import { addJobValidator } from "./jobs.validators";

router.get("/jobs", jobController.getAllJobs);
router.get("/jobs/:id", jobController.getJobById);

router.post(
  "/jobs",
  [onlyContractors, validateBy(addJobValidator)],
  jobController.create
);

router.put("/jobs/:id", [onlyContractors], jobController.updateJob);
// router.put("/jobs", jobController.randomUpdate);

export default router;
