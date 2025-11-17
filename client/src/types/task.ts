import { Comment } from "./comment";
import { Project } from "./project";
import { User } from "./user";

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: string;
  type: string;
  priority: string;
  assigneeId: string;
  due_date: Date;
  createdAt: Date;
  updatedAt: Date;

  project: Project;
  assignee: User;
  comments: Comment[];
}
