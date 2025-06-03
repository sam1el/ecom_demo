import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // BAD PRACTICE: Store user object and password in localStorage, no expiration
    const userStr = localStorage.getItem('user');
    const password = localStorage.getItem('password');
    if (userStr) {
      const u = JSON.parse(userStr);
      u.password = password;
      return u;
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      if (user.password) localStorage.setItem('password', user.password);
      // BAD PRACTICE: Log sensitive info
      console.log('AuthContext user:', user);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
