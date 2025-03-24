import PostModel, { IPost } from "../models/PostModel";
import TagModel from "../models/TagModel";
import CategoryModel from "../models/CategoryModel";
import UserModel from "../models/UserModel";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import LikeModel from "../models/LikeModel";

export const deletePost = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    await PostModel.deleteOne({ slug }).lean();
  } catch (e) {
    res.status(500).json({ message: "Nastala chyba při mazání příspěvku." });
    return;
  }

  res.status(200).json({ message: "Příspěvek byl úspěšně smazán." });
};

export const getPost = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Token nebyl nalezen!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string };
  const userId = await UserModel.findOne({ username: verifiedToken.username }, { _id: 1 }).lean();

  const post = await PostModel.findOne({ slug: slug })
    .populate("tags", "title slug")
    .populate("author", "username firstName lastName")
    .populate("category", "title slug")
    .select("-__v")
    .lean();

  if (!post) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const liked = (await LikeModel.exists({ parent: post._id, user: userId, parentType: "Post", like: true })) || false;
  const disliked = (await LikeModel.exists({ parent: post._id, user: userId, parentType: "Post", like: false })) || false;

  res.json({ post, liked, disliked });
};

export const getPosts = async (req: Request, res: Response) => {
  const offset = req.query.offset as unknown as number;
  const limit = req.query.limit as unknown as number;
  const published = req.query.published;

  const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
  const categories = req.query.categories ? (req.query.categories as string).split(",") : [];
  const authors = req.query.authors ? (req.query.authors as string).split(",") : [];

  const tagIds = await Promise.all(tags.map(async (tag) => await TagModel.findOne({ slug: tag }).select("_id").lean()));
  const categoryIds = await Promise.all(categories.map(async (category) => await CategoryModel.findOne({ slug: category }).select("_id").lean()));
  const authorIds = await Promise.all(authors.map(async (author) => await UserModel.findOne({ username: author }).select("_id").lean()));

  const query: any = {};
  const addToQuery = (field: string, ids: any[]) => {
    if (ids.length > 0 && ids[0] !== null) {
      query[field] = { $in: ids.map((id) => id?._id) };
    }
  };

  if (published === "true") {
    query.published = true;
  }

  if (published === "false") {
    query.published = false;
  }

  addToQuery("tags", tagIds);
  addToQuery("category", categoryIds);
  addToQuery("author", authorIds);

  const validAuthors = await UserModel.find({ role: { $in: ["autor", "admin"] } })
    .select("_id")
    .lean();
  query.author = { $in: validAuthors.map((author) => author._id) };

  const totalPosts = await PostModel.countDocuments(query);

  const posts: IPost[] = await PostModel.find(query)
    .sort({ published: -1 })
    .populate("tags", "title")
    .populate("author", "username firstName lastName")
    .populate("category", "title")
    .select("-content")
    .select("updatedAt")
    .select("-__v")
    .select("published")
    .skip(offset)
    .limit(limit)
    .lean();

  res.json({ posts: posts, hasMore: offset < totalPosts });
};

export const postPost = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const { slug, title, content, perex, category, tags, publish } = req.body;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (!slug || !title || !content || !category || !tags) {
    res.status(400).json({ message: "Všechny pole musí být vyplněny!" });
    return;
  }

  const postExists = await PostModel.findOne({ slug }).lean();

  if (postExists) {
    res.status(400).json({ message: "Příspěvek s tímto odkazem již existuje!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string };
  const author = await UserModel.findOne({ username: verifiedToken.username }, { _id: 1 }).lean();
  const tagsIds = await Promise.all(tags.map(async (tag: string) => await TagModel.findOne({ slug: tag }).select("_id").lean()));
  const categoryId = await CategoryModel.findOne({ slug: category }).select("_id").lean();

  // slug: { type: String, unique: true },
  // author: { type: Types.ObjectId, ref: "User", required: true },
  // title: { type: String, required: true },
  // content: { type: String, required: true },
  // perex: { type: String },
  // category: { type: Types.ObjectId, ref: "Category", required: true },
  // tags: { type: [Types.ObjectId], ref: "Tag", default: [] },
  // published: { type: Boolean, default: false },

  const post = { slug, author: author?._id, title, content, perex, category: categoryId?._id, tags: tagsIds.map((tag) => tag?._id), publish };

  try {
    PostModel.create(post);
  } catch (e) {
    res.status(500).json({ message: "Nastala chyba při vytváření příspěvku." });
    return;
  }

  res.status(200).json({ message: publish ? "Příspěvek byl úspěšně publikován." : "Příspěvek byl úspěšně uložen jako koncept." });
};

export const putPost = async (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const { slug, title, content, perex, category, tags, published } = req.body;

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }

  if (!slug || !title || !content || !category || !tags) {
    res.status(400).json({ message: "Všechna pole musí být vyplněna!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string };
  const author = await UserModel.findOne({ username: verifiedToken.username }, { _id: 1 }).lean();
  const tagsIds = await Promise.all(tags.map(async (tag: string) => await TagModel.findOne({ slug: tag }, { _id: 1 }).lean()));
  const categoryId = await CategoryModel.findOne({ slug: category }, { _id: 1 }).lean();

  const post = { slug, author: author?._id, title, content, perex, category: categoryId?._id, tags: tagsIds.map((tag) => tag?._id), published };

  try {
    await PostModel.updateOne({ slug: slug }, post);
  } catch (e) {
    res.status(500).json({ message: "Nastala chyba při upravování příspěvku." });
    return;
  }

  res.status(200).json({ message: "Příspěvek byl úspěšně upraven." });
};

export const likePost = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string };
  const user = await UserModel.findOne({ username: verifiedToken.username }, { _id: 1 }).lean();
  const post = await PostModel.findOne({ slug: slug }, { _id: 1 }).lean();

  if (!user || !post) {
    res.status(404).json({ message: "Uživatel nebo příspěvek nebyl nalezen!" });
    return;
  }

  try {
    const existingLike = await LikeModel.findOne({ user: user._id, parent: post._id, parentType: "Post", like: true }).lean();

    if (existingLike) {
      await LikeModel.deleteOne({ _id: existingLike._id });
      await PostModel.updateOne({ slug: slug }, { $inc: { likes: -1 } });
      res.status(200).json({ liked: false });
      return;
    }

    await LikeModel.create({ user: user._id, parent: post._id, parentType: "Post", like: true });
    await PostModel.updateOne({ slug: slug }, { $inc: { likes: 1 } });
    res.status(200).json({ liked: true });
    return;
  } catch (e) {
    res.status(500).json({ message: "Nastala chyba při zpracování liku." });
    return;
  }
};

export const dislikePost = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string };
  const user = await UserModel.findOne({ username: verifiedToken.username }, { _id: 1 }).lean();
  const post = await PostModel.findOne({ slug: slug }, { _id: 1 }).lean();

  if (!user || !post) {
    res.status(404).json({ message: "Uživatel nebo příspěvek nebyl nalezen!" });
    return;
  }

  try {
    const existingLike = await LikeModel.findOne({ user: user._id, parent: post._id, parentType: "Post", like: false }).lean();

    if (existingLike) {
      await LikeModel.deleteOne({ _id: existingLike._id });
      await PostModel.updateOne({ slug: slug }, { $inc: { dislikes: -1 } });
      res.status(200).json({ disliked: false });
      return;
    }

    await LikeModel.create({ user: user._id, parent: post._id, parentType: "Post", like: false });
    await PostModel.updateOne({ slug: slug }, { $inc: { dislikes: 1 } });
    res.status(200).json({ disliked: true });
    return;
  } catch (e) {
    res.status(500).json({ message: "Nastala chyba při zpracování disliku." });
    return;
  }
};
