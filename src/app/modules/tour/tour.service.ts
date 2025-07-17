import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Tour, TourType } from "./tour.model";

const createTourType = async (payload: string) => {
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
export const tourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType,
};
