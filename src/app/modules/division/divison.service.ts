import { IDivision } from "./division.interface";
import { Division } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {
  const result = new Division({
    name: payload.name,
    thumbnail: payload.thumbnail,
    description: payload.description,
  });
  await result.save();

  return result;
};

const getAllDivision = async () => {
  return await Division.find({});
};

const updateDivision = async (id: string, payload: IDivision) => {
  const updatedData = await Division.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });

  return updatedData;
};
export const divistionService = {
  createDivision,
  getAllDivision,
  updateDivision,
};
