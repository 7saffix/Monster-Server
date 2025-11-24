import { NextFunction, Request, Response } from "express";
import { authService } from "./auth.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await authService.login(req.body);

    res.cookie("accessToken", user.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    sendResponse(res, {
      success: true,
      statusCode: 200,
      message: "login successful successful",
      data: user,
    });
  }
);

export const authController = { login };
