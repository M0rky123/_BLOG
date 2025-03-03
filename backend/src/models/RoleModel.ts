import mongoose from "mongoose";

export interface IRole {
  name: String;
  displayName: String;
}

const RoleScheme = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: true },
});

const RoleModel = mongoose.model<IRole>("Role", RoleScheme);

export default RoleModel;
