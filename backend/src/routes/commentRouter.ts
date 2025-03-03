import { Router } from "express";
import CommentModel from "../models/CommentModel";
const commentRouter = Router();

commentRouter.get("/comments", async (_req, res) => {
  const comments = await CommentModel.find();
  res.json(comments);
});

commentRouter.get("/:id", async (req, res) => {
  const comment = await CommentModel.findById(req.params.id);
  res.json(comment);
});

export default commentRouter;
