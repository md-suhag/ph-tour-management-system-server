import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import { createTourtypeZodSchema } from "./tour.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourtypeZodSchema),
  tourController.createTourType
);

export const tourRoutes = router;
