import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserWithThatEmailExistsException } from "../exceptions/userWithThatEmailExists.exception";
import { PasswordDoesNotMatchException } from "../exceptions/passwordDoesNotMatch.exception";
import { UserDoesNotExistException } from "../exceptions/userDoesNotExist.exception";
import { EmailNotValidException } from "../exceptions/emailNotValid.exception";
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./login.dto";

export class AuthService {
  /*
   * Handles the Auth logic so the auth controller is only responsible for request handling.
   * includes methods corresponding with registration & login functionality
   */

  // "Injecting" a service into another service seems less than ideal from Angular experience
  // but it works here.
  private userService = new UserService();

  public async register(userData: CreateUserDto) {
    // Checks for existing user emails that match the provided one.
    // This ensures they remain unique
    const emailCheck = await this.userService.findUserByEmail(userData.email);
    if (emailCheck.rowCount !== 0) {
      // Throws a custom error that bubbles up to the controller if needed
      throw new UserWithThatEmailExistsException(userData.email);
    }
    // Does a very basic check on whether an email is valid-ish.
    // Checks for <string>@<string>.<string>, so it's not very robust.
    // There are better regexes for email but I didn't want to go
    // overboard considering the spec.
    const re = /\S+@\S+\.\S+/;
    if (!re.test(userData.email)) {
      // Throws if the regex does not match.
      throw new EmailNotValidException(userData.email);
    }
    // Hashes the password, with 10 rounds of salt.
    userData.password = await bcrypt.hash(userData.password, 10);
    //
    // Calls the user service's addUser method to insert the new user /w hashed pw
    const dbResponse = await this.userService.addUser(userData);
    // pulls the user object from the db response.
    const user = dbResponse.rows[0];
    // Strips the password hash after inserting it into the db,
    // but before returning it to be added to the response.
    user.password_hash = undefined;
    // creates Bearer token with the user's id as the only jwt property
    //
    const token = `Bearer ${this.createToken(user.id)}`;
    return {
      token,
      user
    };
  }

  public async login(loginData: LoginDto) {
    const userQueryResult = await this.userService.findUserByEmail(
      loginData.email
    );
    if (userQueryResult.rowCount === 0) {
      throw new UserDoesNotExistException(loginData.email);
    }
    const user = userQueryResult.rows[0];
    if (await bcrypt.compare(loginData.password, user.password_hash)) {
      const token = `Bearer ${this.createToken(user.id)}`;
      user.password_hash = undefined;
      return {
        token,
        user
      };
    } else {
      throw new PasswordDoesNotMatchException();
    }
  }

  private createToken = (id): string => {
    const expiresIn = 60 * 60 * 24 * 7; // One Week
    const secret = process.env.JWT_SECRET;
    const dataStoredinToken: DataStoredInToken = {
      id
    };
    return jwt.sign(dataStoredinToken, secret, { expiresIn });
  };
}
