import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import PostModel from "../models/PostModel";

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { uuid: string };

  const isAdmin = await UserModel.findOne({ _id: verifiedToken.uuid, role: "admin" });

  if (!isAdmin) {
    res.status(401).json({ message: "Nemáte dostatečná práva!" });
    return;
  }

  const users = await UserModel.find().lean();
  res.json(users);
};

export const getAuthors: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  const authors = await UserModel.find({ role: { $in: ["autor", "admin"] } }, { _id: 0, firstName: 1, lastName: 1, username: 1 }).lean();
  res.json(authors);
};

export const getUserByUsername: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  try {
    const user = await UserModel.findOne({ username: username }, { firstName: 1, lastName: 1, username: 1 }).lean();

    if (!user) {
      res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
      return;
    }

    res.json({
      userName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
};

export const deleteUserById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username } = req.params;

  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { uuid: string };

  const deletingUser = await UserModel.findOne({ username: username }).lean();
  const executingUser = await UserModel.findOne({ _id: verifiedToken.uuid }).lean();

  if (executingUser?.role !== "admin") {
    res.status(401).json({ message: "Nemáte dostatečná práva!" });
    return;
  }

  if (executingUser?.username === username) {
    res.status(401).json({ message: "Nemůžete smazat sami sebe!" });
    return;
  }

  if (deletingUser?.role === "admin" && deletingUser.username === "admin") {
    res.status(401).json({ message: "Nemůžete smazat admina!" });
    return;
  }

  if (deletingUser?.role === "autor") {
    await PostModel.deleteMany({ author: deletingUser._id });
  }

  try {
    await UserModel.deleteOne({ username: username }).lean();
    res.status(200).json({ message: "Uživatel byl smazán!" });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
};

export const putUserByUsername: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { username, role } = req.body;

  try {
    await UserModel.updateOne({ username: username }, { role }).lean();
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
    return;
  }
  res.status(200).json({ message: "Uživatel byl upraven!" });
};
