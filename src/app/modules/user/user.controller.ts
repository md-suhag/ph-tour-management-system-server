/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User created successfully",
      data: user,
    });
  }
);
const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.id;
    const VerifiedToken = req.user;

    const payload = req.body;

    const user = await UserServices.updateUser(
      userId,
      payload,
      VerifiedToken as JwtPayload
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Updated successfully",
      data: user,
    });
  }
);
const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await UserServices.getAllUsers(
      query as Record<string, string>
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Users retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);
const getSingleUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const result = await UserServices.getSingleUser(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "User Retrieved Successfully",
      data: result.data,
    });
  }
);

const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const decodedToken = req.user as JwtPayload;
    const result = await UserServices.getMe(decodedToken.userId);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Your profile Retrieved Successfully",
      data: result.data,
    });
  }
);
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getMe,
};
