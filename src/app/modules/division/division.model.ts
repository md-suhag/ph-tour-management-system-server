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

divisionSchema.pre("findOneAndUpdate", async function (next) {
  const division = this.getUpdate() as Partial<IDivision>;

  if (division.name) {
    const baseSlug = createSlug(division.name);

    let uniqueSlug = baseSlug;
    let counter = 1;

    while (await this.model.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${baseSlug}-${counter++}`;
    }
    division.slug = uniqueSlug;
  }

  this.setUpdate(division);

  next();
});

export const Division = model<IDivision>("Division", divisionSchema);
