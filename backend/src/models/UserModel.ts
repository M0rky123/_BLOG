import mongoose, { Document } from "mongoose";
import RoleModel from "./RoleModel";

export interface IUser extends Document {
  username: string; // uziv. jmeno (login)
  firstName: string; // krestni jmeno
  lastName: string; // prijmeni
  email: string; // email (login)
  password: string; // zahashovane heslo
  roles?: string[]; // role uzivatele
  restrictions?: string[]; // seznam omezeni
}

const UserScheme = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, validate: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    roles: { type: [String], ref: "Role" },
    restrictions: { type: [String] },
  },
  { timestamps: true }
);

UserScheme.pre("save", async function (next) {
  const defaultRole = await RoleModel.findOne({ name: "ctenar" }, { name: 1 });
  this.roles.push(defaultRole!.name as string);
  next();
});

const UserModel = mongoose.model<IUser>("User", UserScheme);

export default UserModel;
