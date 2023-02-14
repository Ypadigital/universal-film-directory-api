const router = require("express").Router();

import { Request, Response } from "express";
import { onlyFreelancers } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import profileController from "../profiles/profiles.controller";
import { updateProfile } from "./profiles.validators";

// router.get("*", (req: Request, res: Response) => {
//   console.log("Hello World!");
//   res.send("Hello World!");
// });
router.get("/profiles/search", profileController.getSearchResults);
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
