import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Product from './models/Product.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
await Product.deleteMany();
await Product.insertMany([
  { name: 'Noir Élégance', brand: 'Luxe Parfum', price: 129, description: 'Smoky oud, amber, and velvet rose.', category: 'Woody', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601', stock: 15 },
  { name: 'Or Blanc', brand: 'Luxe Parfum', price: 99, description: 'Citrus blossom with white musk finish.', category: 'Floral', image: 'https://images.unsplash.com/photo-1595425964078-65f5e3ce3f5d', stock: 20 },
  { name: 'Midnight Saffron', brand: 'Luxe Parfum', price: 149, description: 'Saffron spice with leather undertones.', category: 'Oriental', image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f', stock: 10 }
]);
console.log('Seeded products');
await mongoose.disconnect();
