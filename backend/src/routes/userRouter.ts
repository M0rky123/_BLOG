import { Router } from "express";
import UserModel from "../models/UserModel";
import { getRole, getUser, getUuid } from "../controllers/UserController";
import RoleModel from "../models/RoleModel";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/uuid", getUuid);
userRouter.get("/role", getRole);

userRouter.get("/users", async (req, res) => {
  // returns all users
  const users = await UserModel.find();
  res.json(users);
});

userRouter.get("/authors", async (req, res) => {
  const authors = await UserModel.find({ roles: "autor" }, { password: 0, __v: 0, _id: 0, restrictions: 0, email: 0 }).lean();
  res.json(authors);
});

userRouter.get("/:userAt", async (req, res) => {
  const userAt = req.params.userAt;
  try {
    const user = await UserModel.findOne({ username: userAt }, { password: 0, __v: 0, _id: 0, restrictions: 0, email: 0 }).lean();

    if (!user) {
      res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
      return;
    }

    res.json({
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      roles: user.roles,
    });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
});

export default userRouter;
