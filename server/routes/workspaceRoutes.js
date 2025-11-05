import express from "express";
import {
  addMember,
  getUserWorkspaces,
} from "../controllers/workspaceController.js";
import { protect } from "../middlewares/authMiddleware.js";

const workspaceRouter = express.Router();

workspaceRouter.get("/", protect, getUserWorkspaces);
workspaceRouter.post("/add-member", protect, addMember);

export default workspaceRouter;
