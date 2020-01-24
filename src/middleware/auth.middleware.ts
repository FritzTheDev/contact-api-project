import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AuthTokenMissingException } from "../exceptions/authTokenMissing.exception";
import { WrongAuthTokenException } from "../exceptions/wrongAuthToken.exception";
import { RequestWithUser } from "../interfaces/RequestWithUser.interface";
import { DataStoredInToken } from "../interfaces/DataStoredInToken.interface";

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headers = req.headers;
  if (headers && headers.authorization) {
    const secret = process.env.JWT_SECRET;
    try {
      const verificationResponse = jwt.verify(headers.authorization, secret) as
      const id = verificationResponse.id;

    }
  }
}