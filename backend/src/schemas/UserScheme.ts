import mongoose from "mongoose";

export interface UserInterface {
  username: String; // uziv. jmeno (login)
  firstName: String; // krestni jmeno
  lastName: String; // prijmeni
  email: String; // email (login)
  password: String; // zahashovane heslo
  role?: mongoose.Schema.Types.ObjectId; // role uzivatele
  restrictions?: String[]; // seznam omezeni
  createdAt?: Date; // datum vytvoreni
}

const UserScheme = new mongoose.Schema({
  username: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true, validate: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
    default: "67b7bfe281f15391b018efe5",
  },
  restrictions: { type: [String] },
  createdAt: { type: Date, default: () => new Date(new Date().getTime() + 60 * 60 * 1000) },
});

export default UserScheme;
