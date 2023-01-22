const router = require("express").Router();

import { onlyFreelancers } from "../../middlewares/auth";
import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import serviceController from "../services/services.controller";
import {
  addServiceValidator,
  updateServiceValidator,
} from "./services.validators";

router.get("/services", serviceController.getAllServices);
router.get("/services/:id", serviceController.getServiceById);
router.get("/services/filter", serviceController.filterServices);

router.post(
  "/services",
  [onlyFreelancers, validateBy(addServiceValidator)],
  serviceController.create
);

router.put(
  "/services/:id",
  [onlyFreelancers, validateBy(updateServiceValidator)],
  serviceController.updateService
);

export default router;
