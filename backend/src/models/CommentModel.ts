import mongoose, { Document, Schema, Types } from "mongoose";

interface IComment extends Document {
  authorId: Types.ObjectId; // ID autora komentáře
  postId: Types.ObjectId; // ID autora komentáře
  content: string; // Text komentáře
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt?: Date;
}

const CommentSchema = new mongoose.Schema<IComment>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
