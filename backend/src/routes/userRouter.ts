import { Router } from "express";
import UserModel from "../models/UserModel";
import { getUser, getUuid } from "../controllers/UserController";
import RoleModel from "../models/RoleModel";

const userRouter = Router();

userRouter.get("/", getUser);
userRouter.get("/uuid", getUuid);

userRouter.get("/all", async (req, res) => {
  // returns all users
  const users = await UserModel.find();
  res.json(users);
});

userRouter.get("/authors", async (req, res) => {
  const authorRole = await RoleModel.findOne({ name: "author" }, { _id: 1 });
  console.log(authorRole!._id.toString());
  const authors = await UserModel.find({ role: authorRole }, { password: 0, __v: 0, _id: 0, createdAt: 0, restrictions: 0, email: 0 }).populate(
    "role",
    { _id: 0, __v: 0 },
    "Role"
  );
  res.json(authors);
});

userRouter.get("/:userAt", async (req, res) => {
  console.log(req.params.userAt);
  const userAt = req.params.userAt;
  try {
    const user = await UserModel.findOne({ username: userAt }, { password: 0, __v: 0, _id: 0, createdAt: 0, restrictions: 0, email: 0 }).populate(
      "role",
      { _id: 0, __v: 0 },
      "Role"
    );

    if (!user) {
      throw new Error("User not found");
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.username,
      role: (user.role as unknown as { displayName: string }).displayName,
    });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
});

export default userRouter;
