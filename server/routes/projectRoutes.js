import express from "express";
import {
  addMember,
  createProject,
  updateProject,
} from "../controllers/projectController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { requireAuth } from "@clerk/express";

const projectRouter = express.Router();

projectRouter.post("/", requireAuth(), createProject);
projectRouter.put("/:projectId", requireAuth(), updateProject);
projectRouter.post("/:projectId/addMember", requireAuth(), addMember);

export default projectRouter;
