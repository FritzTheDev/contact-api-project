import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthTokenMissingException } from "../exceptions/authTokenMissing.exception";
import { WrongAuthTokenException } from "../exceptions/wrongAuthToken.exception";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import { UserService } from "../user/user.service";

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  // Pulls the user service in so I can compare user creds
  const userService = new UserService();
  // get the bearer token from the Authorization Header
  const headers = req.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    // Slices the "Bearer " off the token
    const token = headers.authorization.slice(7)
    try {
      // verifies the token is valid
      const verificationResponse = jwt.verify(token, secret) as DataStoredInToken;
      // peels the id off the valid jwt
      const id = verificationResponse.id;
      // finds the user by their id
      const dbResponse = await userService.findUserById(Number(id));
      if (dbResponse.rows[0]) {
        // attaches the user to the request object
        req.user = dbResponse.rows[0];
        // goes to the next function in the chain
        next();
      } else {
        // Error handling from here on down
        next(new WrongAuthTokenException());
      }
    } catch (error) {
      next(new WrongAuthTokenException());
    }
  } else {
    next(new AuthTokenMissingException());
  }
}