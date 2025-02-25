import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
// import RoleModel from "../models/RoleModel";

export const getUser: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token = jwt.verify(req.cookies.access_token, process.env.ACCESS_SECRET as string) as { uuid: string };

  if (!token) {
    res.status(401).json({ message: "Nejste přihlášeni!" });
    return;
  }

  const user = await UserModel.findOne({ _id: token.uuid }, { username: 1, firstName: 1, lastName: 1, role: 1, _id: 0 });

  if (!user) {
    res.status(404).json({ message: "Uživatel nebyl nalezen!" });
    return;
  }

  const response = {
    firstName: user.firstName!.toString(),
    lastName: user.lastName!.toString(),
    username: user.username.toString(),
    // role: (await RoleModel.findOne({ _id: user.role }))?.displayName.toString(),
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
