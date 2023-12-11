import express from 'express';
import { ProductsController } from '../controllers/products.controller.js';
import { needSignin } from '../middlewares/need-signin.middleware.js';

const router = express.Router();
const productsController = new ProductsController();

// 인증이 필요한 라우터에 미들웨어 추가
router.post('/', needSignin, productsController.create);
router.get('/', productsController.findAll);
router.get('/:productId', productsController.findById);
router.put('/:productId', needSignin, productsController.update);
router.delete('/:productId', needSignin, productsController.delete);

export default router;
