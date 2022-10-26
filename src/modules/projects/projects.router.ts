const router = require("express").Router();

import { imageMulter } from "../../lib/multer";
import validateBy from "../../middlewares/validator";
import { projectsUpload } from "../projects/projects.validators";
import projectsController from "./projects.controller";

router.post("/projects", validateBy(projectsUpload), projectsController.create);

router.get("/projects/meta/:tokenId", projectsController.getMeta);

export default router;
