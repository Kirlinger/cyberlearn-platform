import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Navbar() {
  const { user, logout } = useAuth();
  return <nav className="border-b border-gold/50 p-4 flex justify-between"><Link to="/" className="text-gold font-bold text-2xl">LUXE PARFUM</Link><div className="space-x-4"><Link to="/products">Shop</Link><Link to="/cart">Cart</Link>{user?.isAdmin && <Link to="/admin">Admin</Link>}{user ? <button onClick={logout}>Logout</button> : <><Link to="/login">Login</Link><Link to="/register">Register</Link></>}</div></nav>;
}
