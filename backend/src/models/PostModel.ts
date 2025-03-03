import mongoose, { Types, Document } from "mongoose";
import slugify from "../utils/slugify";

export interface IPost extends Document {
  slug: String;
  author: Types.ObjectId;
  title: String;
  content: String;
  perex: String;
  category: Types.ObjectId;
  tags: Types.ObjectId[];
  published: Boolean;
  views: Number;
  likes: Number;
  dislikes: Number;
  comments: Types.ObjectId[];
}

const PostScheme = new mongoose.Schema(
  {
    slug: { type: String, unique: true },
    author: { type: Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    perex: { type: String },
    category: { type: Types.ObjectId, ref: "Category", required: true },
    tags: { type: [Types.ObjectId], ref: "Tag", default: [] },
    published: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
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

const PostModel = mongoose.model<IPost>("Post", PostScheme);

export default PostModel;
