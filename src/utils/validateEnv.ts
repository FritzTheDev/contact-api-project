import { cleanEnv, str, port } from "envalid";

// adds validation for env vars that are always required.
// runs on server start, called in server.ts
export const validateEnv = () => {
  cleanEnv(process.env, {
    JWT_SECRET: str(),
    PGHOST: str(),
    PGPORT: port(),
    PGDATABASE: str(),
    PGUSER: str(),
    PGPASSWORD: str(),
    PORT: port()
  });
}