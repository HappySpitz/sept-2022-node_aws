import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { User } from "../dataBase";
import { EEmailActions } from "../enums";
import { emailService } from "../services";

dayjs.extend(utc);
const emailSender = async (): Promise<void> => {
  const previousWeek = dayjs().utc().subtract(1, "week");

  const users = await User.find({ updatedAt: { $lte: previousWeek } });

  await Promise.all(
    users.map(async (user) => {
      await emailService.sendMail(user.email, EEmailActions.REMINDER);
    })
  );
};

export const sendEmailReminder = new CronJob("0 0 * * *", emailSender);
