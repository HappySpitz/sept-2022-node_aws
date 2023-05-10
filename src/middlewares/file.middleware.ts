import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { avatarConfig } from "../configs";
import { ApiError } from "../errors";

class FileMiddleware {
  public isAvatarValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No files to upload!", 400);
      }

      if (Array.isArray(req.files)) {
        throw new ApiError("You can upload only one photo!", 400);
      }

      const { size, mimetype, name } = req.files.avatar as UploadedFile;

      if (size > avatarConfig.MAX_SIZE) {
        throw new ApiError(`File ${name} is too big.`, 400);
      }

      if (!avatarConfig.MIMETYPES.includes(mimetype)) {
        throw new ApiError(`File ${name} has invalid format.`, 400);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
