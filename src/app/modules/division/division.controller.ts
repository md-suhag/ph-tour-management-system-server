import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divistionService } from "./divison.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const createdDivision = await divistionService.createDivision(req.body);
    console.log(createDivision);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Division created successfully",
      data: createdDivision,
    });
  }
);

export const divisionController = {
  createDivision,
};
