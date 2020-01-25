import * as express from "express";
import { Controller } from "../interfaces/controller.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDto } from "../user/user.dto";
import { LoginDto } from "./login.dto";
import { AuthService } from "./auth.service";

export class AuthController implements Controller {
  public path = "/auth";
  public router = express.Router();
  private authService = new AuthService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LoginDto), this.login);
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const tokenAndUser = await this.authService.register(userData);
      response.status(200).json(tokenAndUser);
    } catch (error) {
      next(error);
    }
  }
  
  private login = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const loginData: LoginDto = request.body;
    try {
      const tokenAndUser = await this.authService.login(loginData);
      response.status(200).json(tokenAndUser);
    } catch (error) {
      next(error);
    }
  }
}