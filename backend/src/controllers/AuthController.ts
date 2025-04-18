import { Request, Response, RequestHandler } from "express";
import UserModel from "../models/UserModel";
import jwt from "jsonwebtoken";
import { stringWithoutSpecialChars } from "../utils/stringWithoutSpecialChars";
import bcrypt from "bcrypt";

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const { loginMethod, password, remember }: { loginMethod: string; password: string; remember: boolean } = req.body;

  const useLoginMethod = loginMethod.includes("@") ? "email" : "username";

  const user = await UserModel.findOne({ [useLoginMethod]: req.body.loginMethod }).lean();

  if (!user) {
    res.status(404).json({ message: "Tento uživatel neexistuje!" });
    return;
  }

  if (!(await bcrypt.compare(password, user.password as string))) {
    res.status(404).json({ message: "Nesprávné heslo!" });
    return;
  }

  const day = 1000 * 60 * 60 * 25;
  const week = day * 7 - 1000 * 60 * 60 * 6;

  const payload = {
    uuid: user._id.toString(),
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
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

  if (await UserModel.exists({ email }).lean()) {
    res.status(409).json({ message: "Účet s tímto e-mailem již existuje." });
    return;
  }

  const userCount = await UserModel.countDocuments({ firstName: sanitizedFirstName, lastName: sanitizedLastName }).lean();
  const finalUsername = sanitizedUsername || `${sanitizedFirstName}.${sanitizedLastName}.${userCount + 1}`;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
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

export const verify: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  const token: string | undefined = req.params.token ? req.params.token : req.cookies.access_token;

  if (!token) {
    res.json(false);
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string) as {
      uuid: string;
      username: string;
      firstName: string;
      lastName: string;
      role: string;
    };

    const user = await UserModel.findById(decoded.uuid, { _id: 1, role: 1 }).lean();

    if (!user) {
      res.json(false);
      return;
    }

    const updatedPayload = {
      uuid: user._id.toString(),
      username: decoded.username,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      role: user.role,
    };

    const updatedAccessToken = jwt.sign(updatedPayload, process.env.ACCESS_SECRET as string, {
      expiresIn: "1d",
    });

    res.cookie("access_token", updatedAccessToken, {
      maxAge: 1000 * 60 * 60 * 25, // 1 day
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });

    res.json(true);
  } catch (error) {
    res.json(false);
    return;
  }
};

export const me: RequestHandler = async (req: Request, res: Response): Promise<void> => {
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
    role: string;
  };

  const user = await UserModel.findOne({ _id: verifiedToken.uuid }, { username: 1, firstName: 1, lastName: 1, role: 1, _id: 0 }).lean();

  if (!user) {
    res.status(404).json({ message: "Uživatel nebyl nalezen!" });
    return;
  }

  const response = {
    firstName: user.firstName!.toString(),
    lastName: user.lastName!.toString(),
    username: user.username.toString(),
    role: user.role,
  };

  res.status(200).json(response);
};
