"use client";

import { ConfirmationResult } from "firebase/auth";
import React, { createContext, useState } from "react";

interface AuthContextType {
  email: string;
  setEmail: (val: string) => void;
  firstName: string;
  setFirstName: (val: string) => void;
  lastName: string;
  setLastName: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  confirmationResult: ConfirmationResult | null;
  setConfirmationResult: (val: ConfirmationResult | null) => void;

  hasAccount: boolean;
  setHasAccount: (val: boolean) => void; 

  error: string | null;
  setError: (val: string | null) => void;
  success: string | null;
  setSuccess: (val: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hasAccount, setHasAccount] = useState<boolean>(true);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        confirmationResult,
        setConfirmationResult,
        hasAccount,
        setHasAccount,
        error,
        setError,
        success,
        setSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
