import { Router } from "express";
import { tourController } from "./tour.controller";
import { validateRequest } from "./../../middlewares/validateRequest";
import {
  createTourtypeZodSchema,
  createTourZodSchema,
  updateTourtypeZodSchema,
} from "./tour.validation";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/create-tour-type",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourtypeZodSchema),
  tourController.createTourType
);
router.get("/tour-types", tourController.getAllTourTypes);
router.patch(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(updateTourtypeZodSchema),
  tourController.updateTourType
);

router.delete(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTourType
);

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  tourController.createTour
);

export const tourRoutes = router;
