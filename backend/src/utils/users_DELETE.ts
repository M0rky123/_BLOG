import UserModel from "../models/UserModel";

export const deleteAllUsers = async () => {
  await UserModel.deleteMany();
  return "All users deleted.";
};
