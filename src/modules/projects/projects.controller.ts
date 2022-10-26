import { Request, Response } from "express";

import response from "../../utils/response";
import projectsService from "./projects.service";

class ProjectsController {
  async create(req: Request, res: Response) {
    const project = await projectsService.create(req.body);
    res.send(response("Successfully Created Project", project));
  }
  async getMeta(req: Request, res: Response) {
    const tokenId = parseInt(req.params.tokenId);
    const project = await projectsService.findByTokenId(tokenId);
    res.send(project);
  }
}

export default new ProjectsController();
