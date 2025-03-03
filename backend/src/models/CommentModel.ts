import mongoose, { Schema, Document } from "mongoose";

interface IComment extends Document {
  authorId: mongoose.Types.ObjectId; // ID autora komentáře
  content: string; // Text komentáře
  likes: number;
  dislikes: number;
  createdAt: Date;
  updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<IComment>("Comment", CommentSchema);

export default CommentModel;
