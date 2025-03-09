import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";

export const getUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as {
    uuid: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
  };

  const user = await UserModel.findOne({ _id: verifiedToken.uuid }, { username: 1, firstName: 1, lastName: 1, roles: 1, _id: 0 });

  if (!user) {
    res.status(404).json({ message: "Uživatel nebyl nalezen!" });
    return;
  }

  const response = {
    firstName: user.firstName!.toString(),
    lastName: user.lastName!.toString(),
    username: user.username.toString(),
    roles: user.roles?.map((role) => role.toString()),
  };

  res.status(200).json(response);
};

export const getUuid: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = jwt.verify(req.cookies.access_token, process.env.ACCESS_SECRET as string) as { uuid: string };

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  res.status(200).json({ uuid: token.uuid });
};

export const getRoles: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = jwt.verify(req.cookies.access_token, process.env.ACCESS_SECRET as string) as { uuid: string };
    res.status(200).json({ message: "Token decoded successfully", token });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
