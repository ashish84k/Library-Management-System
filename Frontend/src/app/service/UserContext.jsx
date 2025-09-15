import React, { createContext, useContext, useState } from "react";

// 1. Create Context
const UserContext = createContext();

// 2. Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login: backend se user data set karne ke liye
  const login = (userData) => {
    setUser(userData);
  };


  return (
    <UserContext.Provider value={{ user, setUser, login }}>
      {children}
    </UserContext.Provider>
  );
};

// 3. Custom Hook
export const useUser = () => useContext(UserContext);
