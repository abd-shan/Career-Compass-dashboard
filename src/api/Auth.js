import React, { createContext, useState, useContext, useEffect } from 'react';
import { setAuthToken } from './Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
  useEffect(() => {
    if (token !== null) {
      localStorage.setItem('access_token', token);
      setAuthToken(token);
    } 
  }, [token]);

  const logout = () => {
    setToken(null);
    localStorage.removeItem('access_token'); 
  };

  return (
    <AuthContext.Provider value={{ token, updateToken, logout }}>
      {children}
    </AuthContext.Provider>
);

};

export const useAuth=()=>{
  return useContext(AuthContext)
}