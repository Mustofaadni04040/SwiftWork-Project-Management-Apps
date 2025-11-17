import { ProjectMember } from "./projectMember";
import { Task } from "./task";
import { User } from "./user";
import { Workspace } from "./workspace";

export interface Project {
  id: string;
  name: string;
  description?: string;
  priority: string;
  status: string;
  start_date?: Date;
  end_date?: Date;
  team_lead: string;
  workspaceId: string;
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  members: ProjectMember[];

  owner: User;
  workspace: Workspace;
  tasks: Task[];
}
