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
const getSingleTourType = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await tourService.getSingleTourType(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour type retrieved successfully",
    data: result,
  });
});

const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await tourService.getAllTourTypes(
      query as Record<string, string>
    );

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

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const result = await tourService.getSingleTour(slug);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tour retrieved successfully",
    data: result,
  });
});

const getAllTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query;
    const result = await tourService.getAllTour(
      query as Record<string, string>
    );

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All Tour retrieved successfully",
      data: result.data,
      meta: result.meta,
    });
  }
);

const updateTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const updatedData = await tourService.updateTour(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour updated successfully",
      data: updatedData,
    });
  }
);

const deleteTour = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await tourService.deleteTour(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Tour  deleted successfully",
      data: result,
    });
  }
);
export const tourController = {
  createTourType,
  getSingleTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getSingleTour,
  getAllTour,
  updateTour,
  deleteTour,
};
