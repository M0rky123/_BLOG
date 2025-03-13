import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import initDB from "./config/db";
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

initDB();

// import UserModel from "./models/UserModel";
// (async () => {
//   await UserModel.deleteMany();
// })();

// (async () => {
//   console.log(await UserModel.updateOne({ username: "smutny.vojta" }, { roles: ["ctenar", "autor", "admin"] }).lean());
// })();

import { makeMockUsers, makeMockRoles, makeMockCategories, makeMockTags, makeMockPosts, makeMockComments } from "./utils/makeMockData";
import roleRouter from "./routes/roleRouter";
import UserModel from "./models/UserModel";
import tagRouter from "./routes/tagsRouter";
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

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/category", categoryRouter);
apiRouter.use("/comment", commentRouter);
apiRouter.use("/post", postRouter);
apiRouter.use("/role", roleRouter);
apiRouter.use("/tag/tags", tagRouter);
apiRouter.use("/token", (req: Request, res: Response) => {
  res.json(jwt.verify(req.cookies.access_token, process.env.ACCESS_SECRET as string));
});
apiRouter.use("/users", userRouter);

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}.`);
});
