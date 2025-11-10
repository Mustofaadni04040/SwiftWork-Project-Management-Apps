import express from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import { requireAuth } from "@clerk/express";

const taskRouter = express.Router();

taskRouter.post("/", requireAuth(), createTask);
taskRouter.put("/:id", requireAuth(), updateTask);
taskRouter.post("/delete", requireAuth(), deleteTask);

export default taskRouter;
