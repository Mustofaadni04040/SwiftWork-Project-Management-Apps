import express from "express";
import {
  createTask,
  deleteTask,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";

const taskRouter = express.Router();

taskRouter.post("/", protect, createTask);
taskRouter.put("/:id", protect, updateTask);
taskRouter.post("/delete", protect, deleteTask);

export default taskRouter;
