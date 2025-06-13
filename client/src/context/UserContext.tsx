"use client";

import { UserResponse } from "@/lib/openapi";
import { createContext, useContext, useEffect, useState } from "react";

type User = UserResponse & {
  photoURL?: string | null;
  isAuthenticated: boolean;
};

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const defaultUser: User = {
    id: 0,
    uid: "",
    email: "",
    first_name: "",
    last_name: "",
    created_at: "",
    photoURL: null,
    isAuthenticated: false,
};

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

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
