import { TourType } from "./tour.model";

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

export const tourService = {
  createTourType,
  getAllTourTypes,
  updateTourType,
};
