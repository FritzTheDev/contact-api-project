import * as express from "express";
import { Controller } from "./interfaces/controller.interface";
import { errorMiddleware } from "./middleware/error.middleware";

export class App {
  private app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    this.initializeMiddleware();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App Listening on Port ${process.env.PORT}`);
    });
  }

  private initializeMiddleware() {
    this.app.use(express.json());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}