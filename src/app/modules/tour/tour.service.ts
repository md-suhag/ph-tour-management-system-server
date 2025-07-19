import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Tour, TourType } from "./tour.model";
import { ITour, ITourType } from "./tour.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  tourSearchableFields,
  tourTypeSearchableFields,
} from "./tour.constant";

const createTourType = async (payload: ITourType) => {
  return await TourType.create({
    name: payload,
  });
};

const getAllTourTypes = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(TourType.find(), query);

  const tourTypes = await queryBuilder
    .search(tourTypeSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tourTypes.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleTourType = async (id: string) => {
  const tourType = await TourType.findById(id);
  return {
    data: tourType,
  };
};
const updateTourType = async (id: string, payload: string) => {
  return await TourType.findByIdAndUpdate(
    id,
    { name: payload },
    {
      runValidators: true,
      new: true,
    }
  );
};

const deleteTourType = async (id: string) => {
  const tour = await Tour.find({ tourType: id });
  if (tour.length > 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This division is associated with one or more tours and cannot be deleted."
    );
  }

  const result = await TourType.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Tour Type not found");
  }
  return result;
};

const createTour = async (payload: ITour) => {
  const newTour = new Tour(payload);

  await newTour.save();
  return newTour;
};
const getSingleTour = async (slug: string) => {
  const tour = await Tour.findOne({ slug });
  return {
    data: tour,
  };
};

const getAllTour = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);

  const tours = await queryBuilder
    .search(tourSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    tours.build(),
    queryBuilder.getMeta(),
  ]);
  return {
    data,
    meta,
  };
};

const updateTour = async (id: string, payload: ITour) => {
  return await Tour.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });
};

const deleteTour = async (id: string) => {
  const result = await Tour.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Tour  not found");
  }
  return result;
};
export const tourService = {
  createTourType,
  getAllTourTypes,
  getSingleTourType,
  updateTourType,
  deleteTourType,
  createTour,
  getSingleTour,
  getAllTour,
  updateTour,
  deleteTour,
};
