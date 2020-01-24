import "dotenv/config";
import { validateEnv } from "./utils/validateEnv";
import { AuthController } from "./auth/auth.controller";
import { App } from "./app";

validateEnv();

const app = new App([
  new AuthController()
]);

app.listen();