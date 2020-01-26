import * as express from "express";
import Router from "express-promise-router";
import { Controller } from "../interfaces/controller.interface";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./createGroup.dto";

export class GroupController implements Controller {
  public path = "/group";
  public router = Router();
  private groupService = new GroupService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, authMiddleware, validationMiddleware(CreateGroupDto), this.addGroup)
  }

  private addGroup = async (req: RequestWithUser, res: express.Response, next: express.NextFunction) => {
    const createdGroup = await this.groupService.createGroup(req.body, req.user.id);
    res.status(201).json(createdGroup.rows[0]);
  }
}