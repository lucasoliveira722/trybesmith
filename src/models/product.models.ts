import { Pool, ResultSetHeader } from 'mysql2/promise';
import Product from '../interfaces/product.interface';
import { OrderWithProduct } from '../interfaces/order.interface';

export default class ProductModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async getById(id: number): Promise<OrderWithProduct[]> {
    const [products] = await
    this.connection.execute('SELECT * FROM Trybesmith.Products WHERE orderId = ?', [id]);
    return products as OrderWithProduct[];
  }

  public async create(product: Product): Promise<Product> {
    const { name, amount, orderId } = product;
    let result;
    if (!orderId) {
      result = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
        [name, amount],
      );
    } else {
      result = await this.connection.execute<ResultSetHeader>(
        'INSERT INTO Trybesmith.Products (name, amount, orderId) VALUES (?, ?, ?)',
        [name, amount, orderId],
      );
    }
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...product };
  }
}
