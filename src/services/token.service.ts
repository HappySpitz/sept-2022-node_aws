import * as jwt from "jsonwebtoken";

import { configs } from "../configs";
import { EActionTokenType, ETokenType } from "../enums";
import { ApiError } from "../errors";
import { IActionTokenPayload, ITokenPair, ITokenPayload } from "../types";

class TokenService {
  public generateTokenPair(payload: ITokenPayload): ITokenPair {
    const accessToken = jwt.sign(payload, configs.ACCESS_SECRET, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, configs.REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  public checkToken(token: string, tokenType = ETokenType.access) {
    try {
      let secret = "";

      switch (tokenType) {
        case ETokenType.access:
          secret = configs.ACCESS_SECRET;
          break;
        case ETokenType.refresh:
          secret = configs.REFRESH_SECRET;
          break;
      }

      return jwt.verify(token, secret) as ITokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }

  public generateActionToken(
    payload: IActionTokenPayload,
    tokenType: EActionTokenType
  ): string {
    let secret = "";
    let expiresIn = "";

    switch (tokenType) {
      case EActionTokenType.activate:
        secret = configs.ACTIVATE_SECRET;
        expiresIn = configs.ACTIVATE_TOKEN_TIME;
        break;
      case EActionTokenType.forgot:
        secret = configs.FORGOT_SECRET;
        expiresIn = configs.FORGOT_TOKEN_TIME;
        break;
    }
    return jwt.sign(payload, secret, { expiresIn });
  }

  public checkActionToken(token: string, tokenType: EActionTokenType) {
    try {
      let secret = "";

      switch (tokenType) {
        case EActionTokenType.forgot:
          secret = configs.FORGOT_SECRET;
          break;
        case EActionTokenType.activate:
          secret = configs.ACTIVATE_SECRET;
          break;
      }

      return jwt.verify(token, secret) as IActionTokenPayload;
    } catch (e) {
      throw new ApiError("Token not valid", 401);
    }
  }
}

export const tokenService = new TokenService();
