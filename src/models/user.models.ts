import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/user.interface';
import createToken from '../middlewares/createToken';

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: User): Promise<string> {
    const { username, classe, level, password } = user;

    const [dataInserted] = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );

    const { insertId } = dataInserted;
    const token = createToken({ id: insertId, username, classe, level });
    return token;
  }
}