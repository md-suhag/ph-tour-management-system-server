import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Tour, TourType } from "./tour.model";
import { ITour, ITourType } from "./tour.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import {
  tourSearchableFields,
  tourTypeSearchableFields,
} from "./tour.constant";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

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
  const existingTour = await Tour.findById(id);

  if (!existingTour) {
    throw new Error("Tour not found.");
  }

  if (
    payload.images &&
    payload.images.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    payload.images = [...payload.images, ...existingTour.images];
  }

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    const restDBImages = existingTour.images.filter(
      (imageUrl) => !payload.deleteImages?.includes(imageUrl)
    );

    const updatedPayloadImages = (payload.images || [])
      .filter((imageUrl) => !payload.deleteImages?.includes(imageUrl))
      .filter((imageUrl) => !restDBImages.includes(imageUrl));

    payload.images = [...restDBImages, ...updatedPayloadImages];
  }

  const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingTour.images &&
    existingTour.images.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCloudinary(url))
    );
  }

  return updatedTour;
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
