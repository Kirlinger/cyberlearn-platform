'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Language } from '@/types';

/* ── Theme ─────────────────────────────────────── */

interface ThemeContextValue {
  dark: boolean;
  setDark: (v: boolean) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cyberlearn_theme');
      if (stored !== null) {
        setDarkState(stored === 'dark');
      }
    } catch {
      /* SSR / storage unavailable */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('cyberlearn_theme', dark ? 'dark' : 'light');
    } catch {
      /* ignore */
    }
  }, [dark, mounted]);

  const setDark = useCallback((v: boolean) => setDarkState(v), []);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within Providers');
  return ctx;
}

/* ── Language ──────────────────────────────────── */

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('cyberlearn_lang');
      if (stored === 'en' || stored === 'fr' || stored === 'ht') {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem('cyberlearn_lang', l);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within Providers');
  return ctx;
}

/* ── Auth ──────────────────────────────────────── */

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
  createdAt: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AuthUser>;
  signup: (name: string, email: string, password: string) => Promise<AuthUser>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const STORAGE_KEY = 'cyberlearn_auth';
const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.email) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
    setLoading(false);
  }, []);

  const login = useCallback((email: string, password: string): Promise<AuthUser> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password) {
          reject(new Error('Email and password are required'));
          return;
        }
        if (password.length < 6) {
          reject(new Error('Invalid credentials'));
          return;
        }
        const userData: AuthUser = {
          id: btoa(email).slice(0, 12),
          email,
          name: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user',
          avatar: null,
          createdAt: new Date().toISOString(),
        };
        setUser(userData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
        resolve(userData);
      }, 800);
    });
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string): Promise<AuthUser> => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!name || !email || !password) {
            reject(new Error('All fields are required'));
            return;
          }
          if (password.length < 6) {
            reject(new Error('Password must be at least 6 characters'));
            return;
          }
          const userData: AuthUser = {
            id: btoa(email).slice(0, 12),
            email,
            name,
            role: 'user',
            avatar: null,
            createdAt: new Date().toISOString(),
          };
          setUser(userData);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
          resolve(userData);
        }, 800);
      });
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within Providers');
  return ctx;
}

/* ── Search ───────────────────────────────────── */

interface SearchContextValue {
  search: string;
  setSearch: (v: string) => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

function SearchProvider({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within Providers');
  return ctx;
}

/* ── Active Section (sidebar filter) ──────────── */

interface SectionContextValue {
  activeSection: string | null;
  setActiveSection: (s: string | null) => void;
}

const SectionContext = createContext<SectionContextValue | null>(null);

function SectionProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useActiveSection() {
  const ctx = useContext(SectionContext);
  if (!ctx) throw new Error('useActiveSection must be used within Providers');
  return ctx;
}

/* ── Combined Providers ───────────────────────── */

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <SearchProvider>
            <SectionProvider>{children}</SectionProvider>
          </SearchProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
