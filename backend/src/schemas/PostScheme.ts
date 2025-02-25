import mongoose, { Types } from "mongoose";
import slugify from "../utils/slugify";

export interface IPost {
  author: Types.ObjectId | string;
  title: String;
  content: String;
  category: Types.ObjectId | string;
  tags: [Types.ObjectId | string];
  published: Boolean;
  views: Number;
  likes: Number;
  comments: [Types.ObjectId | string] | [];
}

const PostScheme = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    tags: { type: [Types.ObjectId] },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: [Types.ObjectId], ref: "Comment", default: [] },
  },
  { timestamps: true }
);

PostScheme.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title);
  }
  next();
});

export default PostScheme;
