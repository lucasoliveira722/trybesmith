import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import ProductRoutes from './routes/product.routes';
import MyError from './interfaces/myError.interface';

const app = express();

app.use(express.json());

app.use(ProductRoutes);

app.use((err: MyError, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err;
  if (status) return res.status(status).json({ message });
  return res.status(500).json(message);
});

export default app;
