const router = require("express").Router();

import { authenticate, onlyFreelancers } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import userController from "../../modules/users/users.controller";
import { login, signUp, updateProfile, updateUser } from "./users.validators";

router.get("/users/me", [authenticate], userController.getUserDetails);
router.get("/users/profile", userController.getUserDetails);
router.get("/users/jobs", [authenticate], userController.getUserJobs);

router.post("/users/register", validateBy(signUp), userController.register);
router.post("/users/login", validateBy(login), userController.login);
router.put(
  "/users",
  [onlyFreelancers, validateBy(updateUser)],
  userController.updateUser
);

router.put(
  "/users/profile",
  [onlyFreelancers, validateBy(updateProfile)],
  userController.updateProfile
);

export default router;
