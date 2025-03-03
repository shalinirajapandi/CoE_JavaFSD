import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  userId: 0,
  setUserId: () => {},
  setIsAuthenticated: () => {},
  setIsAdmin: () => {},
});

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(0);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        userId,
        isAdmin,
        setIsAdmin,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
