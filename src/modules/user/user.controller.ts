import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const userRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const Data = req.body;
    const user = await userService.userRegister(Data);
    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      // next(error)
    });
  }
};

export const userController = { userRegister };
