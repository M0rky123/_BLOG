import { Router } from "express";
import PostModel, { IPost } from "../models/PostModel";

const postRouter = Router();

postRouter.get("/posts", async (req, res) => {
  const posts: IPost[] = await PostModel.find({ published: true }).populate("tags", "title").lean();

  res.json(posts);
});

export default postRouter;
