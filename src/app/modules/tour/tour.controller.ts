/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";

const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourService.createTourType(req.body.name);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour Type created successfully",
      data: result,
    });
  }
);

const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourService.getAllTourTypes();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Tour Type retrieved successfully",
      data: result,
    });
  }
);

const updateTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedData = await tourService.updateTourType(
      req.params.id,
      req.body.name
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour Type updated successfully",
      data: updatedData,
    });
  }
);

const deleteTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourService.deleteTourType(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour Type deleted successfully",
      data: result,
    });
  }
);

const createTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourService.createTour(req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Tour created successfully",
      data: result,
    });
  }
);

const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tours = await tourService.getAllTour();

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Tour retrieved successfully",
      data: tours,
    });
  }
);
export const tourController = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTour,
};
