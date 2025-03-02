import mongoose, { Types } from "mongoose";

export interface ICategory {
  title: String;
  slug: String;
}

const CategoryScheme = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default CategoryScheme;
