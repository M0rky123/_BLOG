import { Router } from "express";
import { IPost } from "../schemas/PostScheme";

const postRouter = Router();

const mockPosts: IPost[] = Array.from({ length: 50 }, (_, index) => ({
  _id: index,
  author: `Author ${index + 1}`,
  title: `Post Title ${index + 1}`,
  content: `This is the content for post ${index + 1}.`,
  category: `Category ${index + 1}`,
  tags: [`tag${index + 1}`],
  published: true,
  views: Math.floor(Math.random() * 100),
  likes: Math.floor(Math.random() * 100),
  comments: [],
}));

postRouter.get("/", async (req, res) => {
  const { offset = 0, limit = 10 } = req.query;
  const start = parseInt(offset as string, 10);
  const end = start + parseInt(limit as string, 10);
  res.json(mockPosts.slice(start, end));
});

export default postRouter;
