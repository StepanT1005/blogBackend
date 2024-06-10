import userRepository from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

class UserService {
  async register(userData: any) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userData.password, salt);

    const user = await userRepository.create({ ...userData, passwordHash });
    return this.generateToken(user);
  }

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error("Incorrect login or password");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error("Incorrect login or password");
    }

    return this.generateToken(user);
  }

  async getUserDetails(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    return this.stripSensitiveData(user);
  }

  private generateToken(user: any) {
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET || "secretkey",
      {
        expiresIn: "30d",
      }
    );
    return { ...this.stripSensitiveData(user), token };
  }

  private stripSensitiveData(user: any) {
    const { passwordHash, ...userData } = user._doc;
    return userData;
  }
}

export default new UserService();
