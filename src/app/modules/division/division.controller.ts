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

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divistionService.getAllDivision();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All division retrieved successfully",
      data: result,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const result = await divistionService.updateDivision(id, req.body);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Division Updated successfully",
      data: result,
    });
  }
);

const deleteDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divistionService.deleteDivision(req.params.id);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Division deleted successfully",
      data: result,
    });
  }
);

export const divisionController = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
};
