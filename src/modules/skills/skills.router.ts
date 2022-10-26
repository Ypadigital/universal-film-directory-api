const router = require("express").Router();

import validateBy from "../../middlewares/validator";
import skillController from "../../modules/skills/skills.controller";
import { addSkillValidator } from "./skills.validators";

router.get("/skills", skillController.getAllSkills);
router.get("/skills/:id", skillController.getSkillById);

router.post("/skills", validateBy(addSkillValidator), skillController.create);

export default router;
