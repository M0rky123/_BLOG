import { Router } from "express";
import { getUsers, getAuthors, getUserByUsername, putUserByUsername, deleteUserById } from "../controllers/UserController";

const userRouter = Router();

userRouter.get("/", getUsers);
userRouter.get("/authors", getAuthors);
userRouter.get("/:username", getUserByUsername);
userRouter.put("/:username", putUserByUsername);
userRouter.delete("/:username", deleteUserById);

export default userRouter;
