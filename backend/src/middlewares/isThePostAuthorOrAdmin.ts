import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import PostModel from "../models/PostModel";

const isThePostAuthorOrAdmin = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
    const slug = req.params.slug;

    if (!token) {
      res.status(403).json({ message: "Token nebyl nalezen!" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string) as { username: string; roles: string[] };
      const post = await PostModel.findOne({ slug: slug }).select("author").populate<{ author: { username: string } }>("author", "username").lean();
      const isTheAuthor = post?.author?.username === decoded.username;

      if (isTheAuthor || decoded.roles.includes("admin")) {
        next();
        return;
      } else {
        res.status(403).json({ message: "Přístup odepřen!" });
        return;
      }
    } catch (err) {
      res.status(403).json({ message: "Neplatný token!" });
      return;
    }
  };
};

export default isThePostAuthorOrAdmin;
