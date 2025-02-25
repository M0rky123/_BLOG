import mongoose from "mongoose";
import CategoryScheme from "../schemas/CategoryScheme";

const CategoryModel = mongoose.model("Category", CategoryScheme);

export default CategoryModel;
