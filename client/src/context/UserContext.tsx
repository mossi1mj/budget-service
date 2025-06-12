"use client";

import { UserResponse } from "@/lib/openapi";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextProps {
  user: UserResponse | null;
  setUser: (user: UserResponse | null) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("User context updated:", user);
    } else {
      console.log("User is null (signed out or not authenticated yet)");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within UserProvider");

  return context;
};
