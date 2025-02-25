import mongoose from "mongoose";

export interface RoleInterface {
  name: String;
  displayName: String;
}

const RoleScheme = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: true },
});

export default RoleScheme;
