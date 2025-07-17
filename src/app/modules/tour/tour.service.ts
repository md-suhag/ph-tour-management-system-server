import { TourType } from "./tour.model";

const createTourType = async (payload: string) => {
  return await TourType.create({
    name: payload,
  });
};

const getAllTourTypes = async () => {
  return await TourType.find({});
};

export const tourService = {
  createTourType,
  getAllTourTypes,
};
