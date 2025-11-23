import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user, accessToken } = await authService.login(req.body);
    res.status(200).json({
      success: true,
      message: "Registration successful",
      data: { user, accessToken },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const authController = { login };
