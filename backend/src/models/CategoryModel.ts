import mongoose, { Types, Document } from "mongoose";

export interface ICategory extends Document {
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

const CategoryModel = mongoose.model<ICategory>("Category", CategoryScheme);

export default CategoryModel;
