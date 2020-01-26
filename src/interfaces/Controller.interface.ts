import { Router } from "express";

export interface Controller {
  // helps structure controllers
  path: string;
  router: Router;
}