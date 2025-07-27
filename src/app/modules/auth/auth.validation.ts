import z from "zod";

export const setPasswordZodSchema = z.object({
  password: z
    .string({ invalid_type_error: "Password must be string" })
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number.",
    })
    .optional(),
});

export const forgotPasswordZodSchema = z.object({
  email: z
    .string({ invalid_type_error: "Email must be string" })
    .email({ message: "Invalid email address format." }),
});

export const resetPasswordZodSchema = z.object({
  id: z.string(),
  newPassword: z.string(),
});
