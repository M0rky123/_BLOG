import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import roleRouter from "./routes/roleRouter";
import tagRouter from "./routes/tagsRouter";
import jwt from "jsonwebtoken";
import "dotenv/config";

const env = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.DB_PORT,
  NAME: process.env.DB_NAME,
  HOST: process.env.DB_HOST,
};

const app: Express = express();

// app.use(cors({ origin: "*", credentials: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(`mongodb://${env.USER}:${env.PASSWORD}@${env.HOST}:${env.PORT}/${env.NAME}?authSource=admin`)
  .then(() => {
    console.log("Úspěch: Připojení k databázi bylo úspěšné!");
  })
  .catch((error) => {
    console.error("Chyba: Připojení k databázi nebylo úspěšné!", error);
  });

// import UserModel from "./models/UserModel";
// (async () => {
//   console.log(await UserModel.updateOne({ username: "smutny.vojta" }, { role: "admin" }).lean());
// })();

// import UserModel from "./models/UserModel";
// (async () => {
//   // const user = await UserModel.deleteMany().lean();
//   const user = await UserModel.create({ firstName: "Admin", lastName: "123", email: "admin@admin.cz", password: "password", username: "admin", role: "admin" });
//   console.log(user);
// })();

import { makeMockUsers, makeMockRoles, makeMockCategories, makeMockTags, makeMockPosts, makeMockComments } from "./utils/makeMockData";
import mongoose from "mongoose";
// makeMockRoles();
// makeMockCategories();
// makeMockTags();
// makeMockUsers(10);
// makeMockComments(200);
// makeMockPosts(100);

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api/categories", categoryRouter);
app.use("/api/comments", commentRouter);
app.use("/api/posts", postRouter);
app.use("/api/tags", tagRouter);
app.use("/api/users", userRouter);

app.use("/api/auth", authRouter);
app.use("/api/token", (req: Request, res: Response) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      res.status(401).json({ error: "No token provided" });
    }
    const tokenData = jwt.verify(token, process.env.ACCESS_SECRET as string);
    res.json(tokenData);
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid token" });
  }
});
app.use("/api/roles", roleRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error("Unhandled error:", err.stack || err);
  res.status(500).json({ error: "Internal server error" });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Backend server is running.");
});

app.listen(process.env.BE_PORT, () => {
  console.log(`✅ Backend running on port ${process.env.BE_PORT}.`);
});
