import "dotenv/config";
import { validateEnv } from "./utils/validateEnv";
import { AuthController } from "./auth/auth.controller";
import { App } from "./app";
import { GroupController } from "./group/group.controller";
import { ContactController } from "./contact/contact.controller";

//validates envs needed for the app
validateEnv();

const app = new App([
  // Controller array gets passed into app.ts constructor
  new AuthController(),
  new GroupController(),
  new ContactController()
]);

// doesn't need a # because it's from the custom app class
app.listen();