import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Tour, TourType } from "./tour.model";
import { ITour, ITourType } from "./tour.interface";

const createTourType = async (payload: ITourType) => {
  return await TourType.create({
    name: payload,
  });
};

const getAllTourTypes = async () => {
  return await TourType.find({});
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

const getAllTour = async () => {
  return await Tour.find({});
};

const updateTour = async (id: string, payload: ITour) => {
  return await Tour.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });
};
export const tourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
  createTour,
  getAllTour,
  updateTour,
};
