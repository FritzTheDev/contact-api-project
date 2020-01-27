import * as express from "express";
import { Controller } from "./interfaces/controller.interface";
import { errorMiddleware } from "./middleware/error.middleware";

export class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    // sets up handlers
    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    // called to start the server
    this.app.listen(process.env.PORT, () => {
      console.log(`App Listening on Port ${process.env.PORT}`);
    });
  }

  private initializeMiddleware() {
    // other middleware for logging etc could go here.
    this.app.use(express.json());
  }

  private initializeControllers(controllers: Controller[]) {
    // each controller gets added here
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    // error handling gets added last
    this.app.use(errorMiddleware);
  }
}