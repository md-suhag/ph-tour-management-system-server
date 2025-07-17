import { TourType } from "./tour.model";

const createTourType = async (payload: string) => {
  return await TourType.create({
    name: payload,
  });
};

export const tourService = {
  createTourType,
};
