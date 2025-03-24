import mongoose from "mongoose";

export interface IRole {
  slug: String;
  title: String;
}

const RoleScheme = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
});

const RoleModel = mongoose.model<IRole>("Role", RoleScheme);

export default RoleModel;
