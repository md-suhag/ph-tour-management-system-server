// src/modules/otp/otp.routes.ts
import express from "express";
import { OTPController } from "./otp.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { sendOTPZodSchema, verifyOTPZodSchema } from "./otp.validation";

const router = express.Router();

router.post("/send", validateRequest(sendOTPZodSchema), OTPController.sendOTP);
router.post(
  "/verify",
  validateRequest(verifyOTPZodSchema),
  OTPController.verifyOTP
);

export const otpRoutes = router;
