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

export const divistionService = { createDivision };
