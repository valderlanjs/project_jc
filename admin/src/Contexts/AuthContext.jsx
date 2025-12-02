import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      try {
        // Aqui você pode fazer uma chamada para validar o token
        // Por enquanto, vamos assumir que o token é válido
        setUser({ username: 'admin', role: 'superadmin' });
      } catch (error) {
        localStorage.removeItem('admin_token');
      }
    }
    setLoading(false);
  };

  const login = async (username, password) => {
    try {
      // TEMPORÁRIO: Login hardcoded até implementar a API de auth
      if (username === 'admin' && password === 'admin123') {
        const userData = { username: 'admin', role: 'superadmin' };
        setUser(userData);
        localStorage.setItem('admin_token', 'temp_token');
        return { success: true };
      }
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, error: 'Erro no login' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('admin_token');
  };

  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};