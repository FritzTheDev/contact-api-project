import { cleanEnv, str, port } from "envalid";

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