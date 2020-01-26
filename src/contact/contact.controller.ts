import * as express from "express";
import Router from "express-promise-router";
import { ForbiddenException } from "../exceptions/forbidden.exception";
import { Controller } from "../interfaces/controller.interface";
import { ContactService } from "./contact.service";
import { authMiddleware } from "../middleware/auth.middleware";
import { validationMiddleware } from "../middleware/validation.middleware";
import { ContactDto } from "./contact.dto";

export class ContactController implements Controller {
  public path = "/contact";
  public router = Router();
  private contactService = new ContactService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/:id`, authMiddleware, validationMiddleware(ContactDto), this.addContact)
  }

  private addContact = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      const createdContactData = await this.contactService.createContact(req.body, req.user.id);
      res.status(201).json(createdContactData.rows[0]);
    } catch (error) {
      next(error);
    }
  }
}