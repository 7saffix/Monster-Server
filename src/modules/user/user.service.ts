import AppError from "../../errorHelper/appError";
import { IUser } from "./user.interface";
import User from "./user.model";

const userRegister = async (payload: IUser) => {
  const { name, password, email } = payload;
  let user = await User.findOne({ email });

  if (user) throw new AppError(400, "user already exist");

  user = new User({ name, email, password });
  await user.save();

  return user;
};

const getMe = async (id: string) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw new AppError(404, "User not found");
  return user;
};

export const userService = { userRegister, getMe };
