import { Router } from "express";

import { userController } from "../controllers";
import {
  authMiddleware,
  commonMiddleware,
  fileMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.getById
);

router.put(
  "/:userId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.isBodyValid(UserValidator.updateUser),
  userMiddleware.getByIdOrThrow,
  userController.update
);

router.delete(
  "/:userId",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.delete
);

router.put(
  "/:userId/avatar",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("userId"),
  fileMiddleware.isAvatarValid,
  userMiddleware.getByIdOrThrow,
  userController.uploadAvatar
);

router.delete(
  "/:userId/avatar",
  authMiddleware.checkedAccessToken,
  commonMiddleware.isIdValid("userId"),
  userMiddleware.getByIdOrThrow,
  userController.deleteAvatar
);

export const userRouter = router;
