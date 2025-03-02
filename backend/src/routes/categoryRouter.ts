import { Router } from "express";
import CategoryModel from "../models/CategoryModel";
const categoryRouter = Router();

categoryRouter.get("/categories", async (req, res) => {
  // returns all categories
  const categories = await CategoryModel.find();
  res.json(categories);
});

categoryRouter.route("/:slug").get(async (req, res) => {
  // returns the category with the given slug
  const slug = req.params.slug;
  const category = await CategoryModel.find({ slug: slug });
  res.json(category);
});

export default categoryRouter;
