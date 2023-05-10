import * as Joi from "joi";

import { regexConstants } from "../constants";
import { EGenders } from "../enums";

export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexConstants.EMAIL)
    .lowercase()
    .trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD);
  private static gender = Joi.valid(...Object.values(EGenders));
  private static age = Joi.number().min(0).max(120);

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    age: this.age.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });

  static updateUser = Joi.object({
    name: this.firstName,
    gender: this.gender,
  });

  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  static changeUserPassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });

  static forgotNewPassword = Joi.object({
    password: this.password.required(),
  });

  static forgotPassword_Email = Joi.object({
    email: this.email.required(),
  });
}
