import mongoose from "mongoose";
import UserScheme from "../schemas/UserScheme";

const UserModel = mongoose.model("User", UserScheme);

export default UserModel;
