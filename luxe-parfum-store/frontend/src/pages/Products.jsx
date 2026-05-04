import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => { api.get('/products').then((r) => setProducts(r.data)); }, []);
  return <div className="grid gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">{products.map((p) => <Link to={`/products/${p._id}`} key={p._id} className="border border-gold/40 rounded-xl p-4 hover:-translate-y-1 transition"><img src={p.image} alt={p.name} className="h-64 w-full object-cover rounded"/><h3 className="text-xl mt-3">{p.name}</h3><p className="text-gold font-bold">${p.price}</p></Link>)}</div>;
}
