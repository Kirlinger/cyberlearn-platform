import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    price: Number,
    qty: Number,
    image: String
  }],
  totalPrice: { type: Number, required: true },
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    country: String
  },
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
