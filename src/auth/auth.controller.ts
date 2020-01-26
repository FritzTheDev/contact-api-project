import * as express from "express";
import Router from "express-promise-router";
import { Controller } from "../interfaces/controller.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDto } from "../user/user.dto";
import { LoginDto } from "./login.dto";
import { AuthService } from "./auth.service";

export class AuthController implements Controller {
/*
* Route Handling & Controllers for Register & Login functions.
* Leverages JWT's as Bearer Tokens for stateless auth.
* Most of the functionality has been offloaded to the AuthService,
* to avoid a huge controller file.
*/
  public path = "/auth";
  public router = Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // Since I've run the request body through my validation middleware, I know the req.body is "valid"
    const userData: CreateUserDto = request.body;
    try {
      // Calls the authService's method instead of doing registration in this function.
      const tokenAndUser = await this.authService.register(userData);
      // Returns both the token for auth, and userData, just for funsies.
      response.status(200).json(tokenAndUser);
    } catch (error) {
      // Passes any errors thrown in the service to the error middleware
      next(error);
    }
  }
  
  private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    // This is basically the same as registration as far as function structure goes,
    // see comments above for context.
    const loginData: LoginDto = request.body;
    try {
      const tokenAndUser = await this.authService.login(loginData);
      response.status(200).json(tokenAndUser);
    } catch (error) {
      next(error);
    }
  }
}