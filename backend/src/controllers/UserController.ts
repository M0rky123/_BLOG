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
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { uuid: string };

  res.status(200).json({ uuid: verifiedToken.uuid });
};

export const getRole: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET as string) as { uuid: string };

  const user = await UserModel.findOne({ _id: verifiedToken.uuid }, { roles: 1, _id: 0 });

  if (!user) {
    res.status(404).json({ message: "Uživatel nebyl nalezen!" });
    return;
  }

  res.status(200).json(user.roles);
};
