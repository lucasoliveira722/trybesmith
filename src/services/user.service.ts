import connection from '../models/connection';
import UserModel from '../models/user.models';
import User from '../interfaces/user.interface';

class UserService {
  public model: UserModel;

  constructor() {
    this.model = new UserModel(connection);
  }

  public async create(user: User): Promise<string> {
    const createdUser = await this.model.create(user);
    return createdUser;
  }
}

export default UserService;