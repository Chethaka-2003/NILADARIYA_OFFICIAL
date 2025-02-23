import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, isEnabled, setIsEnabled, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};