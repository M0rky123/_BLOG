import { Router } from "express";
import PostModel, { IPost } from "../models/PostModel";
import TagModel from "../models/TagModel";
import CategoryModel from "../models/CategoryModel";
import UserModel from "../models/UserModel";

const postRouter = Router();

postRouter.get("/posts", async (req, res) => {
  const offset = req.query.offset as unknown as number;
  const limit = req.query.limit as unknown as number;

  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  const categories = req.query.categories ? (req.query.categories as string).split(",") : [];
  const authors = req.query.authors ? (req.query.authors as string).split(",") : [];

  const tagIds = await Promise.all(tags.map(async (tag) => await TagModel.findOne({ slug: tag }).select("_id").lean()));
  const categoryIds = await Promise.all(categories.map(async (category) => await CategoryModel.findOne({ slug: category }).select("_id").lean()));
  const authorIds = await Promise.all(authors.map(async (author) => await UserModel.findOne({ username: author }).select("_id").lean()));

  const query: any = {
    published: true,
  };
  const addToQuery = (field: string, ids: any[]) => {
    if (ids.length > 0 && ids[0] !== null) {
      query[field] = { $in: ids.map((id) => id?._id) };
    }
  };

  addToQuery("tags", tagIds);
  addToQuery("category", categoryIds);
  addToQuery("author", authorIds);

  const posts: IPost[] = await PostModel.find(query)
    .sort({ published: -1 })
    .populate("tags", "title")
    .populate("author", "username")
    .populate("category", "title")
    .select("-content")
    .select("-updatedAt")
    .select("-__v")
    .select("-published")
    .skip(offset)
    .limit(limit)
    .lean();

  res.json({ posts: posts.slice(0, 12), hasMore: posts.length > 12 });
});

export default postRouter;
