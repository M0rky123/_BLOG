import mongoose, { Types } from "mongoose";

export interface CategoryInterface {
  title: String;
  slug: String;
  parent: Types.ObjectId;
  subcategories: [Types.ObjectId];
  createdAt?: Date;
  updatedAt?: Date;
}

const CategoryScheme = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  parent: { type: Types.ObjectId, ref: "Category", default: null },
  subcategories: [{ type: Types.ObjectId, ref: "Category" }],
  createdAt: { type: Date, default: () => new Date(new Date().getTime() + 60 * 60 * 1000) },
  updatedAt: { type: Date, default: Date.now },
});

export default CategoryScheme;
