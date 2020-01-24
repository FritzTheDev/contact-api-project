import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthTokenMissingException } from "../exceptions/authTokenMissing.exception";
import { WrongAuthTokenException } from "../exceptions/wrongAuthToken.exception";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import { UserService } from "../user/user.service";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const userService = new UserService();
  const headers = req.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(headers.authorization, secret) as DataStoredInToken;
      const id = verificationResponse.id;
      const user = userService.findUserById(Number(id));
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
    next(new AuthTokenMissingException());
  }
}