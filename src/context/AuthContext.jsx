import { createContext, useContext, useEffect, useState } from 'react';
import { authApi } from '../api/services';
import { itemFrom } from '../utils/data';
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('pulse_token'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  useEffect(() => { if (!token) { setUser(null); setLoading(false); return; } let active = true; setLoading(true); authApi.me().then((res) => { if (active) setUser(itemFrom(res)); }).catch(() => { if (active) logout(); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [token]);
  function login(newToken) { localStorage.setItem('pulse_token', newToken); setToken(newToken); }
  function logout() { localStorage.removeItem('pulse_token'); setToken(null); setUser(null); }
  async function refreshUser() { const result = await authApi.me(); setUser(itemFrom(result)); }
  return <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser }}>{children}</AuthContext.Provider>;
}
export function useAuth() { const context = useContext(AuthContext); if (!context) throw new Error('useAuth must be used inside AuthProvider'); return context; }
