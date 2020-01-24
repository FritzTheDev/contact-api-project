import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { UserWithThatEmailExistsException } from "../exceptions/userWithThatEmailExists.exception";
import { DataStoredInToken } from "../interfaces/dataStoredInToken.interface";
import { TokenData } from "../interfaces/tokenData.interface";
import { CreateUserDto } from "../user/user.dto";
import { UserService } from "../user/user.service";

export class AuthService {
  private userService = new UserService();

  public async register(userData: CreateUserDto) {
    if (await this.userService.findUserByEmail(userData.email)) {
      throw new UserWithThatEmailExistsException(userData.email);
    }
    userData.password = await bcrypt.hash(userData.password, 10);
    const userArray = await this.userService.addUser(userData)
    const user = userArray.rows[0] as any;
    user.password = undefined;
    const token = this.createToken(user);
    return {
      token,
      user
    }
  }

  private createToken = (user: any): TokenData => {
    const expiresIn = 60 * 60 * 72 // Three days
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