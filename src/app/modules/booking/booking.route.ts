import { Router } from "express";
import { BookingController } from "./booking.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import { createBookingZodSchema } from "./booking.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/",
  checkAuth(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  BookingController.createBooking
);

export const bookingRoutes = router;
