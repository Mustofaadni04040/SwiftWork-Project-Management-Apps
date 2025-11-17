import { Project } from "./project";
import { User } from "./user";

export interface ProjectMember {
  id: string;
  userId: string;
  projectId: string;
  user: User;
  project: Project;
}
