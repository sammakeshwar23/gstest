import express from 'express';
import { register, login } from '../controllers/authController';
import { getProducts } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/api/register', register);
router.post('/api/login', login);

router.get('/api/products', authenticate, getProducts);

export default router;
