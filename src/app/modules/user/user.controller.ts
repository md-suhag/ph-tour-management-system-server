/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = await UserServices.createUser(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "User created successfully",
    data: user,
  });
};

export const UserControllers = {
  createUser,
};
