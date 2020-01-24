import * as express from "express";
import { Controller } from "../interfaces/controller.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDto } from "../user/user.dto";
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
  }

  private registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
    const userData: CreateUserDto = request.body;
    try {
      const {
        token,
        user
      } = await this.authService.register(userData);
      response.status(200).json({ token, user });
    } catch (error) {
      next(error);
    }
  }
}