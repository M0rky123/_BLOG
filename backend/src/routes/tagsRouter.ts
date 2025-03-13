import { Router, Request, Response } from "express";
import TagModel from "../models/TagModel";

const tagRouter = Router();

tagRouter.get("/", async (_req: Request, res: Response) => {
  const tags = await TagModel.find();
  res.json(tags);
});

export default tagRouter;
