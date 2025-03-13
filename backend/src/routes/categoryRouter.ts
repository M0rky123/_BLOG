import { Router } from "express";
import CategoryModel from "../models/CategoryModel";
import hasRole from "../middlewares/hasRole";
const categoryRouter = Router();

categoryRouter
  .route("/")
  .get(async (req, res) => {
    const categories = await CategoryModel.find().lean();
    res.json(categories);
  })
  .post(hasRole("admin"), async (req, res) => {});

categoryRouter
  .route("/:slug")
  /*
   TODO: PUT /api/categories/:slug
   TODO: Access: admin
   TODO: Description: Updates a category with a specific slug
   TODO: Priority: Low
   */
  .put(hasRole("admin"), async (req, res) => {
    const { slug } = req.body;
    const category = await CategoryModel.find({ slug: slug }).lean();
    res.json(category);
  })
  /*
   TODO: DELETE /api/categories/:slug
   TODO: Access: admin
   TODO: Description: Deletes a category with a specific slug
   TODO: Priority: Medium
   */
  .delete(hasRole("admin"), async (req, res) => {
    const { slug } = req.params;
    const category = await CategoryModel.deleteOne({ slug: slug }).lean();
    res.json(category);
  });

export default categoryRouter;
