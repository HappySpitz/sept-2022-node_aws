import { Router } from "express";

import { authController } from "../controllers";
import { EActionTokenType } from "../enums";
import {
  authMiddleware,
  commonMiddleware,
  userMiddleware,
} from "../middlewares";
import { UserValidator } from "../validators";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.createUser),
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.put(
  "/register/activate/:token",
  authMiddleware.checkActionToken(EActionTokenType.activate),
  authController.isActivatedAccount
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.loginUser),
  userMiddleware.getDynamicallyOrThrow("email", "body"),
  authController.login
);

router.post(
  "/password/change",
  commonMiddleware.isBodyValid(UserValidator.changeUserPassword),
  authMiddleware.checkedAccessToken,
  authController.changePassword
);

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword_Email),
  userMiddleware.getDynamicallyOrThrow("email"),
  authController.forgotPassword
);

router.put(
  "/password/forgot/:token",
  commonMiddleware.isBodyValid(UserValidator.forgotNewPassword),
  authMiddleware.checkActionToken(EActionTokenType.forgot),
  authMiddleware.checkOldPassword,
  authController.setForgotPassword
);

router.post(
  "/refresh",
  authMiddleware.checkedRefreshToken,
  authController.refresh
);

export const authRouter = router;
