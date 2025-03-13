import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const hasRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;

    if (!token) {
      res.status(403).json({ message: "Token nebyl nalezen!" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET as string) as { roles: string[] };

      if (decoded.roles && decoded.roles.includes(role)) {
        next();
        return;
      } else {
        res.status(403).json({ message: "Přístup odepřen!" });
        return;
      }
    } catch (err) {
      res.status(403).json({ message: "Neplatný token!" });
      return;
    }
  };
};

export default hasRole;
