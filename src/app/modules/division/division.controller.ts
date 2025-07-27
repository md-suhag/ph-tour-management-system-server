/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { divistionService } from "./divison.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IDivision } from "./division.interface";

const createDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path,
    };

    const createdDivision = await divistionService.createDivision(payload);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Division created successfully",
      data: createdDivision,
    });
  }
);

const getAllDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await divistionService.getAllDivision(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All division retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const getSingleDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await divistionService.getSingleDivision(req.params.slug);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Divisions retrieved",
      data: result.data,
    });
  }
);

const updateDivision = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const payload: IDivision = {
      ...req.body,
      thumbnail: req.file?.path,
    };
    const result = await divistionService.updateDivision(id, payload);

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
  getSingleDivision,
  updateDivision,
  deleteDivision,
};
