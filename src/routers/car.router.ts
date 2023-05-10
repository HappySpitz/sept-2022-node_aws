import { Router } from "express";

import { carController } from "../controllers";
import {
  authMiddleware,
  carMiddleware,
  commonMiddleware,
} from "../middlewares";
import { CarValidator } from "../validators";

const router = Router();

router.get(
  "/:carId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.getById
);

router.post(
  "/",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isBodyValid(CarValidator.create),
  carController.create
);

router.put(
  "/:carId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("carId"),
  commonMiddleware.isBodyValid(CarValidator.update),
  carMiddleware.getByIdOrThrow,
  carController.update
);

router.delete(
  "/:carId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("carId"),
  carMiddleware.getByIdOrThrow,
  carController.delete
);

export const carRouter = router;
