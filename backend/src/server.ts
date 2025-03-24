import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import initDB from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import roleRouter from "./routes/roleRouter";
import tagRouter from "./routes/tagsRouter";
import jwt from "jsonwebtoken";

const app: Express = express();
const server = express.Router();
const port = process.env.BE_PORT;

app.use("/api", server);
server.use(express.json());
server.use(cookieParser());
server.use(cors({ origin: process.env.FE_DOMAIN, credentials: true }));

initDB();

// import UserModel from "./models/UserModel";
// (async () => {
//   console.log(await UserModel.updateOne({ username: "smutny.vojta" }, { role: "admin" }).lean());
// })();

// import PostModel from "./models/PostModel";
// (async () => {
//   const user = await PostModel.deleteMany().lean();
//   console.log(user);
// })();

import { makeMockUsers, makeMockRoles, makeMockCategories, makeMockTags, makeMockPosts, makeMockComments } from "./utils/makeMockData";
// makeMockRoles();
// makeMockCategories();
// makeMockTags();
// makeMockUsers(10);
// makeMockComments(200);
// makeMockPosts(100);

// ########## DEBUG ##############################

server.use((req, res, next) => {
  console.log(`${req.method} Route accessed: /api${req.path}`);
  next();
});

// ########## DEBUG ##############################

server.use("/categories", categoryRouter);
server.use("/comments", commentRouter);
server.use("/posts", postRouter);
server.use("/tags", tagRouter);
server.use("/users", userRouter);

server.use("/auth", authRouter);
server.use("/token", (req: Request, res: Response) => {
  res.json(jwt.verify(req.cookies.access_token, process.env.ACCESS_SECRET as string));
});
server.use("/roles", roleRouter);

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}.`);
});
