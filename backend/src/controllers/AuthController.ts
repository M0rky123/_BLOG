import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import { UserInterface } from "../models/UserModel";
import { stringWithoutSpecialChars } from "../utils/stringWithoutSpecialChars";
import bcrypt from "bcrypt";
import RoleModel from "../models/RoleModel";

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginMethod, password, remember }: { loginMethod: string; password: string; remember: boolean } = req.body;

  const useLoginMethod = loginMethod.includes("@") ? "email" : "username";

  const user = await UserModel.findOne({ [useLoginMethod]: req.body.loginMethod }).lean();

  if (!user) {
    res.status(404).json({ message: "Tento uživatel neexistuje!" });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(404).json({ message: "Nesprávné heslo!" });
    return;
  }

  const userRole = await RoleModel.findOne({ _id: user.role }).lean();

  const day = 1000 * 60 * 60 * 25;
  const week = day * 7 - 1000 * 60 * 60 * 6;

  const payload = {
    uuid: user._id.toString(),
    role: userRole?._id.toString(),
  };

  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET as string, {
    expiresIn: remember ? "7d" : "1d",
  });

  res
    .status(200)
    .cookie("access_token", accessToken, {
      maxAge: remember ? week : day,
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    })
    .send({ success: true });
};

export const logout: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  res.status(200).clearCookie("access_token").send({ success: true });
};

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, username }: { email: string; password: string; firstName: string; lastName: string; username: string } =
    req.body;

  const sanitizedUsername = username.trim() ? stringWithoutSpecialChars(username) : null;
  const sanitizedFirstName = firstName.trim();
  const sanitizedLastName = lastName.trim();

  if (sanitizedUsername && (await UserModel.exists({ username: sanitizedUsername }))) {
    res.status(409).json({ message: "Uživatel s tímto uživatelským jménem již existuje." });
    return;
  }

  if (await UserModel.exists({ email })) {
    res.status(409).json({ message: "Účet s tímto e-mailem již existuje." });
    return;
  }

  const userCount = await UserModel.countDocuments({ firstName: sanitizedFirstName, lastName: sanitizedLastName });
  const finalUsername = sanitizedUsername || `${sanitizedFirstName}.${sanitizedLastName}.${userCount + 1}`;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user: UserInterface = {
    username: finalUsername,
    firstName: sanitizedFirstName,
    lastName: sanitizedLastName,
    email: email,
    password: hashedPassword,
  };

  try {
    await UserModel.create(user);
    res.status(200).json({ message: 'Po kliknutí na tlačítko "Pokračovat" budete přesměrování na stránku pro přihlášení.' });
  } catch (error) {
    res.status(500).json({ message: "Nastala neznámá chyba při vytváření uživatele!" });
  }
};
