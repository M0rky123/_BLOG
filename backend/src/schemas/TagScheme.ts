import mongoose from "mongoose";

export interface ITag {
  title: String;
  slug: String;
}

const TagScheme = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default TagScheme;
