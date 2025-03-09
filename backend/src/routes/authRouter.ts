import { Router } from "express";
import { login, logout, register, verify } from "../controllers/AuthController";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.post("/register", register);
authRouter.get("/logout", logout);
authRouter.get("/verify", verify);
authRouter.get("/verify/:token", verify);

export default authRouter;
