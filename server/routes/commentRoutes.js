import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addComment,
  getCommentsByTask,
} from "../controllers/commentController.js";
import { requireAuth } from "@clerk/express";

const commentRouter = express.Router();

commentRouter.post("/", requireAuth(), addComment);
commentRouter.get("/:taskId", requireAuth(), getCommentsByTask);

export default commentRouter;
