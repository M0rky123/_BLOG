import { Router, Request, Response } from "express";
import RoleModel from "../models/RoleModel";

const roleRouter = Router();

roleRouter.get("/roles", async (_req: Request, res: Response) => {
  const roles = await RoleModel.find();
  res.json(roles);
});

export default roleRouter;
