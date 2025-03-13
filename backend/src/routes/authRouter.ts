import { Router } from "express";
import { login, logout, me, register, verify } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.post("/logout", logout);
authRouter.get("/me", me);
authRouter.get("/verify", verify);

export default authRouter;
