import mongoose from "mongoose";
import RoleScheme from "../schemas/RoleScheme";

const RoleModel = mongoose.model("Role", RoleScheme);

export default RoleModel;
