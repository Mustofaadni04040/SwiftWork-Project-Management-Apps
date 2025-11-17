import { Comment } from "./comment";
import { Project } from "./project";
import { ProjectMember } from "./projectMember";
import { Task } from "./task";
import { Workspace } from "./workspace";
import { WorkspaceMember } from "./workspaceMember";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;

  workspaces: WorkspaceMember[];
  projects: Project[];
  tasks: Task[];
  comments: Comment[];
  ownedWorkspaces: Workspace[];
  ProjectMember: ProjectMember[];
}
