import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import * as express from "express";

import { HttpException } from "../exceptions/http.exception";

export function validationMiddleware<T>(
  type: any,
  skipMissingProperties = false // this makes it throw on a missing property
): express.RequestHandler {
  return (req, res, next) => {
    // runs validation on the body with the provided dto
    validate(plainToClass(type, req.body), { skipMissingProperties }).then(
      // handles errors, noting which constraints were violated
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          // joins triggered constraints
          const message = errors
            .map((error: ValidationError) => Object.values(error.constraints))
            .join(", ");
          // passes error if invalid
          next(new HttpException(400, message));
        } else {
          // progresses if valid
          next();
        }
      }
    );
  };
}
