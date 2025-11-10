import express from "express";
import {
  addMember,
  getUserWorkspaces,
} from "../controllers/workspaceController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireAuth } from "@clerk/express";

const workspaceRouter = express.Router();

workspaceRouter.get("/", requireAuth(), getUserWorkspaces);
workspaceRouter.post("/add-member", requireAuth(), addMember);

export default workspaceRouter;
