const router = require("express").Router();

import { onlyFreelancers } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import profileController from "../profiles/profiles.controller";
import { updateProfile } from "./profiles.validators";

router.get("/profiles/:id", profileController.getProfile);
router.get("/profiles", profileController.getManyProfiles);
router.get("/profiles/services/:id", profileController.getUserServices);

router.post("/profiles/views/:id", profileController.addProfileView);
router.put(
  "/profiles",
  [onlyFreelancers, validateBy(updateProfile)],
  profileController.updateProfile
);

export default router;
