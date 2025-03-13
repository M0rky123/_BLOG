import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";

export const getUsers: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { uuid: string };

  const isAdmin = await UserModel.findOne({ _id: verifiedToken.uuid, roles: "admin" });

  if (!isAdmin) {
    res.status(401).json({ message: "Nemáte dostatečná práva!" });
    return;
  }

  const users = await UserModel.find();
  res.json(users);
};

export const getAuthors: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  const authors = await UserModel.find({ roles: "autor" }, { _id: 0, firstName: 1, lastName: 1, username: 1 }).lean();
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
      roles: user.roles,
    });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
};

export const deleteUserById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await UserModel.deleteOne({ _id: id });
    res.status(200).json({ message: "Uživatel byl smazán!" });
  } catch {
    res.status(404).json({ message: "Tento uživatel nebyl nalezen!" });
  }
};
