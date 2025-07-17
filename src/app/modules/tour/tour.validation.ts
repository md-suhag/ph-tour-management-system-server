import z from "zod";

export const createTourtypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(1, { message: "name is required" }),
});

export const updateTourtypeZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .min(1, { message: "name is required" }),
});
