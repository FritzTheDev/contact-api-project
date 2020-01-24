import { query } from "../database";

export const findUserbyId = async (id: number) => {
  return await query("SELECT * FROM users WHERE id = $1", [id]);
};