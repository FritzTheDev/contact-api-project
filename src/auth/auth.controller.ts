import * as express from "express";
import { Controller } from "../interfaces/Controller.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { CreateUserDto } from "../user/user.dto";
import { AuthService } from "./auth"