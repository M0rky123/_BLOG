import express, { Express, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { database } from "./config/db";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import categoryRouter from "./routes/categoryRouter";
import RoleModel from "./models/RoleModel";
import postRouter from "./routes/postRouter";

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

// import fakeFillUsers from "./utils/fakeFillUsers";
// fakeFillUsers(3);

// import CategoryModel from "./models/CategoryModel";
// (async () => {
//   await CategoryModel.create({ title: "Web development", slug: "web-development", parent: null, subcategories: [] });
//   await CategoryModel.create({ title: "Mobile development", slug: "mobile-development", parent: null, subcategories: [] });
//   await CategoryModel.create({ title: "Data Science", slug: "data-science", parent: null, subcategories: [] });
//   await CategoryModel.create({ title: "Machine Learning", slug: "machine-learning", parent: null, subcategories: [] });
//   await CategoryModel.create({ title: "DevOps", slug: "devops", parent: null, subcategories: [] });
// })();

import TagModel from "./models/TagModel";
async () => {
  await TagModel.deleteMany();
  await TagModel.create({ name: "JavaScript", slug: "javascript" });
  await TagModel.create({ name: "TypeScript", slug: "typescript" });
  await TagModel.create({ name: "React", slug: "react" });
  await TagModel.create({ name: "Vue", slug: "vue" });
  await TagModel.create({ name: "Angular", slug: "angular" });
  await TagModel.create({ name: "Node.js", slug: "nodejs" });
  await TagModel.create({ name: "Express", slug: "express" });
  await TagModel.create({ name: "NestJS", slug: "nestjs" });
  await TagModel.create({ name: "MongoDB", slug: "mongodb" });
  await TagModel.create({ name: "PostgreSQL", slug: "postgresql" });
  await TagModel.create({ name: "MySQL", slug: "mysql" });
  await TagModel.create({ name: "Docker", slug: "docker" });
  await TagModel.create({ name: "Kubernetes", slug: "kubernetes" });
  await TagModel.create({ name: "AWS", slug: "aws" });
  await TagModel.create({ name: "GCP", slug: "gcp" });
};
// ########## DEBUG ##############################

app.use((req, res, next) => {
  console.log(`${req.method} Route accessed: ${req.path}`);
  next();
});

// ########## DEBUG ##############################

(async () => {
  // await RoleModel.deleteMany();
  // await RoleModel.create({ name: "user", displayName: "Čtenář" });
  // await RoleModel.create({ name: "author", displayName: "Autor" });
  // await RoleModel.create({ name: "editor", displayName: "Editor" });
  // await RoleModel.create({ name: "moderator", displayName: "Moderátor" });
  // await RoleModel.create({ name: "administrator", displayName: "Administrátor" });
})();

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/role", async (_req: Request, res: Response) => {
  const roles = await RoleModel.find();
  res.json(roles);
});
app.use("/api/posts", postRouter);

app.get("/api", (_req: Request, res: Response) => {
  res.json({ message: "Hello, API!" });
});

app.listen(port, () => {
  console.log(`✅ Backend running on port ${port}.`);
});
