import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserWithThatEmailExistsException } from "../exceptions/userWithThatEmailExists.exception";
import { PasswordDoesNotMatchException } from "../exceptions/passwordDoesNotMatch.exception";
import { UserDoesNotExistException } from "../exceptions/userDoesNotExist.exception";
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import { TokenData } from "../interfaces/tokenData.interface";
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";
import { LoginDto } from "./login.dto";

export class AuthService {
  private userService = new UserService();

  public async register(userData: CreateUserDto) {
    const emailCheck = await this.userService.findUserByEmail(userData.email);
    if (emailCheck.rowCount !== 0) {
      throw new UserWithThatEmailExistsException(userData.email);
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const userArray = await this.userService.addUser(userData)
    const user = userArray.rows[0];
    user.password_hash = undefined;
    const token = this.createToken({ id: user.id });
    return {
      token,
      user
    }
  }

  public async login(loginData: LoginDto) {
    const userQueryResult = await this.userService.findUserByEmail(loginData.email);
    if (userQueryResult.rowCount === 0) {
      throw new UserDoesNotExistException(loginData.email);
    }
    const user = userQueryResult.rows[0];
    try {
      // Will throw on mismatch
      await bcrypt.compare(loginData.password, user.password_hash);
      const token = this.createToken({ id: user.id });
      user.password_hash = undefined;
      return {
        token,
        user
      }
    } catch {
      throw new PasswordDoesNotMatchException();
    }
  }

  private createToken = (user: any): TokenData => {
    const expiresIn = 60 * 60 * 24 * 7 // One Week
    const secret = process.env.JWT_SECRET;
    const dataStoredinToken: DataStoredInToken = {
      id: user.id
    }
    return {
      expiresIn,
      token: jwt.sign(dataStoredinToken, secret, { expiresIn })
    }
  }
}