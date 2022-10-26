const router = require("express").Router();

import { user_authenticate } from "../../middlewares/auth";
import validateBy from "../../middlewares/validator";
import userController from "../../modules/users/users.controller";
import { login, signUp, updateUser } from "./users.validators";

router.get("/users/me", userController.getUserFromJwt);
router.get("/profiles/:id", userController.getUserProfile);
router.get("/profiles/services/:id", userController.getUserServices);

router.post("/profiles/views/:id", userController.addProfileView);
router.post("/users/register", validateBy(signUp), userController.register);
router.post("/users/login", validateBy(login), userController.login);
router.put(
  "/users",
  [user_authenticate, validateBy(updateUser)],
  userController.updateUser
);

export default router;
