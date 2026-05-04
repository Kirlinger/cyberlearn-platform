import { createContext, useContext, useMemo, useState } from 'react';
const CartContext = createContext();
export const useCart = () => useContext(CartContext);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addToCart = (product) => setItems((prev) => [...prev, { ...product, qty: 1 }]);
  const removeFromCart = (id) => setItems((prev) => prev.filter((i) => i._id !== id));
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items]);
  return <CartContext.Provider value={{ items, addToCart, removeFromCart, total, setItems }}>{children}</CartContext.Provider>;
}
