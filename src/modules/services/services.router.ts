const router = require("express").Router();

import { user_authenticate } from "../../middlewares/auth";
import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import serviceController from "../services/services.controller";
import { addServiceValidator } from "./services.validators";

router.get("/services", serviceController.getAllServices);
router.get("/services/:id", serviceController.getServiceById);

router.post(
  "/services",
  [
    user_authenticate,
    imageMulter.array("images", 3),
    validateBy(addServiceValidator),
  ],
  serviceController.create
);

export default router;
