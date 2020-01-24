import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthTokenMissingException } from "../exceptions/authTokenMissing.exception";
import { WrongAuthTokenException } from "../exceptions/wrongAuthToken.exception";
import { RequestWithUser } from "../interfaces/RequestWithUser.interface";
import { DataStoredInToken } from "../interfaces/DataStoredInToken.interface";
import { findUserbyId } from "../user/user.service";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headers = req.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(headers.authorization, secret) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = findUserbyId(id);
      if (user) {
        req.user = user;
        next();
      } else {
        next(new WrongAuthTokenException());
      }
    } catch (error) {
      next(new WrongAuthTokenException());
    }
  } else {
    next(new AuthTokenMissingException);
  }
}