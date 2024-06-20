import UserModel from "../models/user.model";

class UserRepository {
  async create(userData: any) {
    const user = new UserModel(userData);
    await user.save();
    return user;
  }

  async findByEmail(email: string) {
    return UserModel.findOne({ email });
  }

  async findById(id: string) {
    return UserModel.findById(id);
  }
}

export default new UserRepository();
