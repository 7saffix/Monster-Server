import { IUser } from "./user.interface";
import User from "./user.model";

const userRegister = async (payload: IUser) => {
  const { name, password, email } = payload;
  let user = await User.findOne({ email });

  if (user) throw new Error("user already exist");

  user = new User({ name, email, password });
  await user.save();

  return user;
};

export const userService = { userRegister };
