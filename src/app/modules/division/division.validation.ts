import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(2, { message: "Division must be at least 2 characters long" }),

  thumbnail: z
    .string({ invalid_type_error: "thumbnail must be string" })
    .min(1, { message: "thumbnail is required" })
    .optional(),

  description: z
    .string({ invalid_type_error: "description must be string" })
    .min(1, { message: "description is required" })
    .optional(),
});
export const updateDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(2, { message: "Division must be at least 2 characters long" }),

  thumbnail: z
    .string({ invalid_type_error: "thumbnail must be string" })
    .min(1, { message: "thumbnail is required" })
    .optional(),

  description: z
    .string({ invalid_type_error: "description must be string" })
    .min(1, { message: "description is required" })
    .optional(),
});
