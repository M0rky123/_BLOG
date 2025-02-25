import { Router } from "express";
import CategoryModel from "../models/CategoryModel";
const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  // returns all categories
  const categories = await CategoryModel.find();
  res.json(categories);
});

categoryRouter.route("/:uuid").get(async (req, res) => {
  // returns the category with the given uuid
  const uuid = req.params.uuid;
  const category = await CategoryModel.find({ _id: uuid });
  res.json(category);
});

export default categoryRouter;
