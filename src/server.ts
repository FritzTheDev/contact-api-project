import "dotenv/config";
import { validateEnv } from "./utils/validateEnv";
import { AuthController } from "./auth/auth.controller";
import { App } from "./app";
import { GroupController } from "./group/group.controller";
import { ContactController } from "./contact/contact.controller";

validateEnv();

const app = new App([
  new AuthController(),
  new GroupController(),
  new ContactController()
]);

app.listen();