import express from 'express';import cors from 'cors';import helmet from 'helmet';import rateLimit from 'express-rate-limit';import mongoSanitize from 'express-mongo-sanitize';import dotenv from 'dotenv';import connectDB from './config/db.js';import authRoutes from './routes/authRoutes.js';import productRoutes from './routes/productRoutes.js';import orderRoutes from './routes/orderRoutes.js';
dotenv.config();connectDB();const app=express();
app.use(helmet());app.use(cors({origin:process.env.CLIENT_URL||'*'}));app.use(express.json());app.use(mongoSanitize());app.use(rateLimit({windowMs:15*60*1000,max:200}));
app.get('/api/health',(_,res)=>res.json({ok:true}));
app.use('/api/auth',authRoutes);app.use('/api/products',productRoutes);app.use('/api/orders',orderRoutes);
app.use((err,req,res,next)=>res.status(500).json({message:err.message||'Server error'}));
app.listen(process.env.PORT||5000,()=>console.log('API running'));
