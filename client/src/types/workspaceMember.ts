import { User } from "./user";
import { Workspace } from "./workspace";

export interface WorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  message: string;
  role: string;
  user: User;
  workspace: Workspace;
}
