import User from "../user/user.model";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import envConfig from "../../config/env";

const login = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (!user) throw new Error("Email does not exist");
  const matchPassword = await bcrypt.compare(password as string, user.password);
  if (!matchPassword) throw new Error("Incorrect password ");

  const jwtPayload = {
    id: user._id,
    email: user.email,
    role: user.role,
  } as JwtPayload;
  const accessToken = jwt.sign(jwtPayload, envConfig.access_secret, {
    expiresIn: envConfig.access_expires_in,
  } as SignOptions);

  return {
    user,
    accessToken,
  };
};

export const authService = { login };
