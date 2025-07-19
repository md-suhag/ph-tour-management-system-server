import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import { Tour } from "../tour/tour.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";

const createDivision = async (payload: Partial<IDivision>) => {
  const result = new Division({
    name: payload.name,
    thumbnail: payload.thumbnail,
    description: payload.description,
  });
  await result.save();

  return result;
};

const getAllDivision = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Division.find(), query);

  const divisionsData = queryBuilder
    .search(divisionSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    divisionsData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleDivision = async (slug: string) => {
  const division = await Division.findOne({ slug });
  return {
    data: division,
  };
};
const updateDivision = async (id: string, payload: IDivision) => {
  const updatedData = await Division.findByIdAndUpdate(id, payload, {
    runValidators: true,
    new: true,
  });

  return updatedData;
};

const deleteDivision = async (id: string) => {
  const tour = await Tour.find({ division: id });
  if (tour.length > 0) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "This division is associated with one or more tours and cannot be deleted."
    );
  }

  const result = await Division.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found");
  }
  return result;
};
export const divistionService = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision,
  getSingleDivision,
};
