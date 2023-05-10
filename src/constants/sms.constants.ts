import { ESmsActionEnum } from "../enums";

export const smsTemplates: {
  [key: string]: string;
} = {
  [ESmsActionEnum.WELCOME]: "Я знаю, що ти зараз дрочиш!",
  [ESmsActionEnum.FORGOT_PASSWORD]:
    "We control your password, just follow all steps and everything will be good",
};
