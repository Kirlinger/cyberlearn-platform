import express from 'express';
import { allOrders, createOrder, myOrders } from '../controllers/orderController.js';
import { adminOnly, protect } from '../middleware/auth.js';

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/mine', protect, myOrders);
router.get('/', protect, adminOnly, allOrders);
export default router;
