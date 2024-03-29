import { query } from "../database";
import { CreateUserDto } from "./user.dto";

export class UserService {
  /*
  * Handles SQL queries relating to users
  * Basically just an interface between the db & the app;
  * SQL queries happen here so they're less coupled.
  */

  // implicit return makes this neat.
  public findUserById = async (id: number) => await query("SELECT * FROM users WHERE id = $1", [id]);

  public findUserByEmail = async (email: string) => await query("SELECT * FROM users WHERE email = $1", [email]);

  public addUser = async (userData: CreateUserDto) => await query("INSERT INTO users(email, full_name, password_hash) VALUES($1, $2, $3) RETURNING *", [userData.email, userData.full_name, userData.password]);
}