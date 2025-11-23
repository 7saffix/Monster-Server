import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const userRegister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await userService.userRegister(req.body);
    sendResponse(res, {
      success: true,
      statusCode: 201,
      message: "Registration successful",
      data: user,
    });
  }
);

export const userController = { userRegister };
