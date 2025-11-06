import prisma from "../configs/prisma.js";

export const addComment = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { content, taskId } = req.body;

    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
      include: { members: { include: { user: true } } },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const member = project.members.find((member) => member.userId === userId);

    if (!member) {
      return res.status(403).json({
        message: "You must be a member of the project to add comments",
      });
    }

    const comment = await prisma.comment.create({
      data: {
        taskId,
        content,
        userId,
      },
      include: { user: true },
    });

    res.status(201).json({ comment, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: error.code || error.message });
  }
};

export const getCommentsByTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { taskId },
      include: { user: true },
    });

    res.status(200).json({ comments });
  } catch (error) {
    console.error("Error getting comment:", error);
    res.status(500).json({ message: error.code || error.message });
  }
};
