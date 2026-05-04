import Order from '../models/Order.js';
export const placeOrder=async(req,res)=>{const {items,total}=req.body;if(!items?.length) return res.status(400).json({message:'No items'});res.status(201).json(await Order.create({user:req.user?.id,items,total}));};
export const getOrders=async(_,res)=>res.json(await Order.find().populate('user','email').sort({createdAt:-1}));
