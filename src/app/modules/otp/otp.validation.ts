import z from "zod";

export const sendOTPZodSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const verifyOTPZodSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4).max(8),
});
