import Order from '../models/Order.js';

export const createOrder = async (req, res) => {
  const { items, shippingAddress, totalPrice } = req.body;
  if (!items?.length) return res.status(400).json({ message: 'Cart is empty' });
  const order = await Order.create({ user: req.user._id, items, shippingAddress, totalPrice });
  res.status(201).json(order);
};

export const myOrders = async (req, res) => res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }));
export const allOrders = async (req, res) => res.json(await Order.find().populate('user', 'name email').sort({ createdAt: -1 }));
