import { Pool } from "pg";

// Creates DB connection pool
const pool = new Pool();

// Makes passing queries easy & standardized across the app.
export const query = (text: string, params: any[]) => pool.query(text, params);