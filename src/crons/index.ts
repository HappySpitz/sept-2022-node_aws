import { removeOldPasswords } from "./remove.old.password.cron";
import { removeOldTokens } from "./remove.old.tokens.cron";
import { sendEmailReminder } from "./send.email.reminder.cron";

export const cronRunner = () => {
  removeOldTokens.start();
  removeOldPasswords.start();
  sendEmailReminder.start();
};
