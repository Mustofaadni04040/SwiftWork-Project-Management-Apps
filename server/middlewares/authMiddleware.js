import { getAuth } from "@clerk/express";

export const protect = async (req, res, next) => {
  try {
    const { sessionId } = getAuth(req);
    if (!sessionId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.code || error.message });
  }
};
