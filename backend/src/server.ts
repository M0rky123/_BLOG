import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { database } from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import RoleModel from "./models/RoleModel";
import TagModel from "./models/TagModel";

const app: Express = express();
const port = process.env.BE_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.FE_DOMAIN, credentials: true }));

database.initDB();

// import UserModel from "./models/UserModel";
// (async () => {
//   await UserModel.deleteMany();
// })();

import { makeMockUsers, makeMockRoles, makeMockCategories, makeMockTags, makeMockPosts, makeMockComments } from "./utils/makeMockData";
// makeMockUsers(10);
// makeMockRoles();
// makeMockCategories();
// makeMockTags();
// makeMockPosts(1);
// makeMockComments(500);

// ########## DEBUG ##############################

app.use((req, res, next) => {
  console.log(`${req.method} Route accessed: ${req.path}`);
  next();
});

// ########## DEBUG ##############################

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tag", async (_req: Request, res: Response) => {
  const tags = await TagModel.find();
  res.json(tags);
});
app.use("/api/role", async (_req: Request, res: Response) => {
  const roles = await RoleModel.find();
  res.json(roles);
});
app.use("/api/post", postRouter);

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Hello, API!" });
});
app.use("/api/comment", commentRouter);

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}.`);
});
