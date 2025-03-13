import { Router } from "express";
import CategoryModel from "../models/CategoryModel";
import hasRole from "../middlewares/hasRole";
const categoryRouter = Router();

categoryRouter.get("/categories", async (req, res) => {
  // returns all categories
  const categories = await CategoryModel.find().lean();
  res.json(categories);
});

// pouze admin

categoryRouter
  .route("/:slug")
  .post(hasRole("admin"), async (req, res) => {
    const { slug } = req.params;
    const category = await CategoryModel.find({ slug: slug }).lean();
    res.json(category);
  })
  .delete(hasRole("admin"), async (req, res) => {
    const { slug } = req.params;
    const category = await CategoryModel.deleteOne({ slug: slug }).lean();
    res.json(category);
  });

export default categoryRouter;
