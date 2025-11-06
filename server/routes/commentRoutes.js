import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addComment,
  getCommentsByTask,
} from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.post("/", protect, addComment);
commentRouter.get("/:taskId", protect, getCommentsByTask);

export default commentRouter;
