import { Router } from 'express';import { getOrders, placeOrder } from '../controllers/orderController.js';import { admin, protect } from '../middleware/auth.js';
const r=Router();r.post('/',protect,placeOrder);r.get('/',protect,admin,getOrders);export default r;
