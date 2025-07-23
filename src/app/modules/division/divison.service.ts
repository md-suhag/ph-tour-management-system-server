import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";
import { Tour } from "../tour/tour.model";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { deleteImageFromCloudinary } from "../../config/cloudinary.config";

const createDivision = async (payload: Partial<IDivision>) => {
  const existingDivision = await Division.findOne({ name: payload.name });
  if (existingDivision) {
    throw new Error("A division with this name already exists.");
  }

  const division = await Division.create(payload);

  return division;
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
  const existingDivision = await Division.findById(id);
  if (!existingDivision) {
    throw new Error("Division not found.");
  }

  const duplicateDivision = await Division.findOne({
    name: payload.name,
    _id: { $ne: id },
  });

  if (duplicateDivision) {
    throw new Error("A division with this name already exists.");
  }

  const updatedDivision = await Division.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (payload.thumbnail && existingDivision.thumbnail) {
    await deleteImageFromCloudinary(existingDivision.thumbnail);
  }
  return updatedDivision;
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
