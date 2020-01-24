import { query } from "../database";

export const findUserbyId = async (id) => {
  const queryResult = await query("SELECT * FROM users WHERE id = $1", [id]);
};