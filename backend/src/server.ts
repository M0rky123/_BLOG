import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { database } from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import TagModel from "./models/TagModel";
import jwt from "jsonwebtoken";

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
import roleRouter from "./routes/roleRouter";
// makeMockRoles();
// makeMockCategories();
// makeMockTags();
// makeMockUsers(10);
// makeMockComments(300);
// makeMockPosts(100);

// ########## DEBUG ##############################

app.use((req, res, next) => {
  console.log(`${req.method} Route accessed: ${req.path}`);
  next();
});

// ########## DEBUG ##############################

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/tag/tags", async (_req: Request, res: Response) => {
  const tags = await TagModel.find();
  res.json(tags);
});
app.use("/api/role", roleRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

app.use("/api/token", (req: Request, res: Response) => {
  const token = req.cookies.access_token;
  const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string);
  res.json(decoded);
});

app.use("/api", (_req: Request, res: Response) => {
  res.send("API is running.");
});

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}.`);
});
