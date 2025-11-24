import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import AppError from "../errorHelper/appError";
import envConfig from "../config/env";
import User from "../modules/user/user.model";

export const checkAuth =
  () => async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies.accessToken;

      if (!token) throw new AppError(403, "no token received!!");

      const verifiedToken = jwt.verify(
        token,
        envConfig.access_secret
      ) as JwtPayload;

      if (!verifiedToken) throw new AppError(403, "invalid token");

      const user = await User.findOne({ email: verifiedToken.email });
      if (!user) throw new AppError(404, "user not found.");

      req.user = verifiedToken;
      next();
    } catch (error) {
      console.log("jwt error", error);
      next(error);
    }
  };
