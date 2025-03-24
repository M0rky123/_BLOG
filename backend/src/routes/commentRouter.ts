import { Router } from "express";
import CommentModel from "../models/CommentModel";
const commentRouter = Router();

commentRouter.get("/", async (_req, res) => {
  const comments = await CommentModel.find().populate("authorId", "username role").lean();
  res.json(comments);
});

commentRouter.route("/:postId").get().post(); // TODO: getComments, addComment
commentRouter.route("/:commentId").delete(); // TODO: deleteComment
commentRouter.route("/:commentId/like").post(); // TODO: likeComment
commentRouter.route("/:commentId/dislike").delete(); // TODO: dislikeComment

export default commentRouter;
