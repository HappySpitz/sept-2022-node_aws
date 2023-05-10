import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { OldPassword } from "../dataBase";

dayjs.extend(utc);

const oldPasswordRemover = async (): Promise<void> => {
  const previousYear = dayjs().utc().subtract(1, "year");

  await OldPassword.deleteMany({ createdAt: { $lte: previousYear } });
};

export const removeOldPasswords = new CronJob("* * * * *", oldPasswordRemover);
