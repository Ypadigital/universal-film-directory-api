import Projects from "./projects.model";
import { IProject } from "./projects.types";

class ProjectsService {
  async create(project: IProject): Promise<IProject> {
    return Projects.create(project);
  }
  async findByTokenId(tokenId: number): Promise<IProject> {
    return Projects.findOne({ tokenId });
  }
}

export default new ProjectsService();
