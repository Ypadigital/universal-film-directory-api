import { Request, Response } from "express";

import response from "../../utils/response";

import { BadRequestError } from "../../config/errors";

import skillService from "../../modules/skills/skills.service";

import skillsService from "./skills.service";

class SkillController {
  async create(req: Request, res: Response) {
    const skill = await skillsService.create(req.body);
    res.send(response("Skill created successfully", skill));
  }

  async getAllSkills(req: Request, res: Response) {
    const skills = await skillsService.getAllSkills();

    res.send(response("Skill retrieved successfully", skills));
  }

  async getSkillById(req: Request, res: Response) {
    const skill = await skillsService.findById(req.params.id);

    res.send(response("Skills retrieved successfully", skill));
  }

  async updateSkill(req: Request & { skill: any }, res: Response) {
    const update = req.body;
    const id = req.skill.id;
    const updatedSkill = await skillService.update(id, update);
    if (!updatedSkill) throw new BadRequestError("Invalid Skill");

    res.send(response("Skill was updated successfully", updatedSkill));
  }
}

export default new SkillController();
