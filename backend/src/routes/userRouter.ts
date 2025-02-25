import { Router } from "express";
import UserModel from "../models/UserModel";
import { getUser, getUuid } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/uuid", getUuid);

userRouter.get("/all", async (req, res) => {
  // returns all users
  const users = await UserModel.find();
  res.json(users);
});

export default userRouter;
