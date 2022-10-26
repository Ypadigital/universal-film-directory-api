const router = require("express").Router();

import usersRouter from "../modules/users/users.router";
import contractorsRouter from "../modules/contractors/contractors.router";
import projectsRouter from "../modules/projects/projects.router";
import imagesRouter from "../modules/images/images.router";
import skillsRouter from "../modules/skills/skills.router";
import servicesRouter from "../modules/services/services.router";
import jobsRouter from "../modules/jobs/jobs.router";

router.use(usersRouter);
router.use(contractorsRouter);
router.use(skillsRouter);
router.use(servicesRouter);
router.use(jobsRouter);
router.use(projectsRouter);
router.use(imagesRouter);

export default router;
