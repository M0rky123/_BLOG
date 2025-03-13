import mongoose, { Types } from "mongoose";
import PostModel from "./PostModel";
import CommentModel from "./CommentModel";

export interface ILike {
  user: string;
  parent: string;
  like: boolean;
}

const LikeScheme = new mongoose.Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  parent: { type: Types.ObjectId, required: true },
  parentType: { type: String, enum: ["Post", "Comment"], required: true },
  like: { type: Boolean, required: true },
});

const LikeModel = mongoose.model<ILike>("Like", LikeScheme);

export default LikeModel;
