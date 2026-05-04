import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';
export default function ProductDetails() {
  const { id } = useParams(); const [product, setProduct] = useState(null); const { addToCart } = useCart();
  useEffect(() => { api.get(`/products/${id}`).then((r) => setProduct(r.data)); }, [id]);
  if (!product) return <p className="p-6">Loading...</p>;
  return <div className="p-6 max-w-4xl mx-auto"><img src={product.image} alt={product.name} className="rounded-xl w-full max-h-[420px] object-cover"/><h2 className="text-3xl mt-4">{product.name}</h2><p className="my-3 text-gray-300">{product.description}</p><p className="text-gold text-2xl">${product.price}</p><button onClick={() => addToCart(product)} className="mt-4 gold-gradient text-black px-6 py-2 rounded">Add to Cart</button></div>;
}
