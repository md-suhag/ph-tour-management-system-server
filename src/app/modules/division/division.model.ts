import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";
import { createSlug } from "./../../utils/createSlug";

const divisionSchema = new Schema<IDivision>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true },
    thumbnail: { type: String },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

divisionSchema.pre("save", async function (next) {
  const baseSlug = createSlug(this.name);

  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await Division.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }
  this.slug = uniqueSlug;

  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
