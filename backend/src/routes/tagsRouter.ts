import { Router, Request, Response } from "express";
import TagModel from "../models/TagModel";
import hasRole from "../middlewares/hasRole";

const tagRouter = Router();

tagRouter
  .route("/")
  .get(hasRole("admin"), async (_req: Request, res: Response) => {
    const tags = await TagModel.find();
    res.json(tags);
  })
  .post(hasRole("admin")) // TODO: createTag
  .delete(hasRole("admin")); // TODO: deleteTag

tagRouter
  .route("/:postSlug")
  .get() // TODO getTagsForPost
  .patch(); // TODO editTagsForPost

export default tagRouter;
