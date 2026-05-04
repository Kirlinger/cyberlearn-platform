import { createContext, useContext, useState } from 'react';
import api from '../services/api';
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [error, setError] = useState('');
  const auth = async (route, payload) => {
    try { setError(''); const { data } = await api.post(`/auth/${route}`, payload); localStorage.setItem('token', data.token); localStorage.setItem('user', JSON.stringify(data.user)); setUser(data.user); }
    catch (e) { setError(e.response?.data?.message || 'Authentication failed'); }
  };
  const logout = () => { localStorage.clear(); setUser(null); };
  return <AuthContext.Provider value={{ user, error, login: (p) => auth('login', p), register: (p) => auth('register', p), logout }}>{children}</AuthContext.Provider>;
}
