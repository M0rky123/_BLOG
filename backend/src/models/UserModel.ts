import mongoose, { Document } from "mongoose";
import RoleModel from "./RoleModel";

export interface IUser extends Document {
  username: String; // uziv. jmeno (login)
  firstName: String; // krestni jmeno
  lastName: String; // prijmeni
  email: String; // email (login)
  password: String; // zahashovane heslo
  roles?: mongoose.Schema.Types.ObjectId[]; // role uzivatele
  restrictions?: String[]; // seznam omezeni
}

const UserScheme = new mongoose.Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, validate: /^\S+@\S+\.\S+$/ },
    password: { type: String, required: true },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    restrictions: { type: [String] },
  },
  { timestamps: true }
);

UserScheme.pre("save", async function (next) {
  const defaultRole = await RoleModel.findOne({ name: "ctenar" }, { _id: 1 });
  this.roles.push(defaultRole!._id);
  next();
});

const UserModel = mongoose.model<IUser>("User", UserScheme);

export default UserModel;
