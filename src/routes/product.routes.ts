import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import productMid from '../middlewares/product.middleware';

const router = Router();

const productController = new ProductController();

router.get('/products', productController.getAll);
router.post(
  '/products',
  productMid.prodNameValidator,
  productMid.prodAmountValidator,
  productController.create,
);

export default router;