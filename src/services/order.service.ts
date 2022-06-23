import connection from '../models/connection';
import OrderModel from '../models/order.models';
import ProductModel from '../models/product.models';
import { OrderWithProduct } from '../interfaces/order.interface';

class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
  }

  async getAll():Promise<OrderWithProduct[]> {
    const orders = await this.orderModel.getAll();

    const productsById = orders.map((o) =>
      this.productModel.getById(o.id));

    const products = await Promise.all(productsById);

    orders.forEach((_order, index: number) => {
      orders[index].productsIds = products[index].map((product) => product.id);
    });

    return orders;
  }
}

export default OrderService;