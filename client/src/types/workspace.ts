import { Project } from "./project";
import { User } from "./user";
import { WorkspaceMember } from "./workspaceMember";

export interface Workspace {
  id: string;
  name: string;
  slug: string;
  description?: string;
  settings: any;
  ownerId: string;
  createdAt: Date;
  image_url: string;
  updatedAt: Date;

  members: WorkspaceMember[];
  projects: Project[];
  owner: User;
}
