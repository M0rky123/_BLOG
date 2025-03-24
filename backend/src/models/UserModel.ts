import mongoose, { Document } from "mongoose";
import RoleModel from "./RoleModel";

export interface IUser extends Document {
  username: string; // uziv. jmeno (login)
  firstName: string; // krestni jmeno
  lastName: string; // prijmeni
  email: string; // email (login)
  password: string; // zahashovane heslo
  role?: string; // role uzivatele
  restrictions?: string[]; // seznam omezeni
}

const UserScheme = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, validate: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    role: { type: String, ref: "Role", default: "ctenar" },
    restrictions: { type: [String] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<IUser>("User", UserScheme);

export default UserModel;
