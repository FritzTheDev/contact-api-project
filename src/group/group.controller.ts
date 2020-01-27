import * as express from "express";
import Router from "express-promise-router";
import { ForbiddenException } from "../exceptions/forbidden.exception";
import { Controller } from "../interfaces/controller.interface";
import { RequestWithUser } from "../interfaces/requestWithUser.interface";
import { validationMiddleware } from "../middleware/validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { GroupService } from "./group.service";
import { ContactService } from "../contact/contact.service";
import { UserService } from "../user/user.service";
import { CreateGroupDto } from "./createGroup.dto";

export class GroupController implements Controller {
  public path = "/group";
  public router = Router();
  // creates new services to use in handlers
  private groupService = new GroupService();
  private contactService = new ContactService();
  private userService = new UserService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/`,
      authMiddleware,
      validationMiddleware(CreateGroupDto),
      this.addGroup
    );
    this.router.get(`${this.path}/`, authMiddleware, this.getOwnedGroups);
    this.router.get(`${this.path}/:id/`, authMiddleware, this.getOneGroup);
  }

  private addGroup = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    // each controller method wraps services in a try/catch then passes errors to next()
    try {
      const createdGroup = await this.groupService.createGroup(
        req.body,
        req.user.id
      );
      res.status(201).json(createdGroup.rows[0]);
    } catch (error) {
      next(error);
    }
  };

  private getOwnedGroups = async (
    // gets all groups associated with the authed user.
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const returnedGroups = await this.groupService.findOwnedGroups(
        req.user.id
      );
      res.status(200).json(returnedGroups.rows);
    } catch (error) {
      next(error);
    }
  };

  private getOneGroup = async (
    // returns a single owned group & associated contacts
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const returnedGroupData = await this.groupService.findOneGroup(
        Number(req.params["id"])
      );

      let returnedContactData; // Set this in a wider scope so I can bundle them for the response

      if (returnedGroupData.rows[0].owner_id === req.user.id) {
        returnedContactData = await this.contactService.findContactsByGroup(
          Number(req.params["id"])
        );

        const fullNameChecks = await returnedContactData.rows.map(
          async (row, index, array) => {
            const returnedUserData = await this.userService.findUserByEmail(
              row.email
            );
            // sets owner id to undefined since we already have it in the response
            array[index].group_id = undefined;
            // adds the name of the contact to the response, if it exists
            if (returnedUserData.rows[0]?.full_name) {
              array[index].full_name = returnedUserData.rows[0].full_name;
            }
          }
        );
        // once all promises in the array have resolved, continue
        await Promise.all(fullNameChecks);
        res
          .status(200)
          .json({
            ...returnedGroupData.rows[0],
            contacts: returnedContactData.rows
          });
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      next(error);
    }
  };
}
