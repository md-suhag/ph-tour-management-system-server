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

export const createTourZodSchema = z.object({
  title: z
    .string({ invalid_type_error: "Tour title must be a string" })
    .min(1, { message: "Tour title is required" }),

  description: z
    .string({ invalid_type_error: "Description must be a string" })
    .optional(),

  images: z
    .array(z.string({ invalid_type_error: "Each image must be a string" }))
    .optional(),

  location: z
    .string({ invalid_type_error: "Location must be a string" })
    .optional(),

  costFrom: z
    .number({ invalid_type_error: "Cost must be a number" })
    .nonnegative()
    .optional(),

  startDate: z
    .string({ invalid_type_error: "Start date must be a string in ISO format" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start date must be a valid date string",
    })
    .optional(),

  endDate: z
    .string({ invalid_type_error: "End date must be a string in ISO format" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid date string",
    })
    .optional(),

  included: z
    .array(
      z.string({ invalid_type_error: "Each included item must be a string" })
    )
    .optional(),

  excluded: z
    .array(
      z.string({ invalid_type_error: "Each excluded item must be a string" })
    )
    .optional(),

  amenities: z
    .array(z.string({ invalid_type_error: "Each amenity must be a string" }))
    .optional(),

  tourPlan: z
    .array(
      z.string({ invalid_type_error: "Each tour plan item must be a string" })
    )
    .optional(),

  maxGuest: z
    .number({ invalid_type_error: "Max guest must be a number" })
    .int()
    .positive()
    .optional(),

  minAge: z
    .number({ invalid_type_error: "Min age must be a number" })
    .int()
    .nonnegative()
    .optional(),

  division: z
    .string({ required_error: "Division ID is required" })
    .min(1, { message: "Division ID must not be empty" }),

  tourType: z
    .string({ required_error: "Tour type ID is required" })
    .min(1, { message: "Tour type ID must not be empty" }),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
});

export const updateTourZodSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  location: z.string().optional(),
  costFrom: z.number().optional(),
  startDate: z.string().optional().optional(),
  endDate: z.string().optional().optional(),
  tourType: z.string().optional(),
  included: z.array(z.string()).optional(),
  excluded: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  tourPlan: z.array(z.string()).optional(),
  maxGuest: z.number().optional(),
  minAge: z.number().optional(),
  departureLocation: z.string().optional(),
  arrivalLocation: z.string().optional(),
  deleteImages: z.array(z.string()).optional(),
});
