import { Router } from "express";
import { getUsers, getAuthors, getUserByUsername, deleteUserById } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/authors", getAuthors);
userRouter.get("/:username", getUserByUsername);
userRouter.delete("/:username", deleteUserById);

export default userRouter;
