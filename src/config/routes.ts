const router = require("express").Router();

import usersRouter from "../modules/users/users.router";
import profilesRouter from "../modules/profiles/profiles.router";
import projectsRouter from "../modules/projects/projects.router";
import imagesRouter from "../modules/images/images.router";
import categoriesRouter from "../modules/categories/categories.router";
import servicesRouter from "../modules/services/services.router";
import jobsRouter from "../modules/jobs/jobs.router";

router.use(usersRouter);
router.use(profilesRouter);
router.use(categoriesRouter);
router.use(servicesRouter);
router.use(jobsRouter);
router.use(projectsRouter);
router.use(imagesRouter);

export default router;
