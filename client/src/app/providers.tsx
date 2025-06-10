"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  ThemeProviderProps,
} from "next-themes";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SideBar } from "@/components/sidebar";
import HeaderLayout from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthenticationContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextThemesProvider {...themeProps}>
      <UserProvider>
        <AuthProvider>
          <SidebarProvider>
            <SideBar />
            <HeaderLayout>{children}</HeaderLayout>
          </SidebarProvider>
          <Toaster />
        </AuthProvider>
      </UserProvider>
    </NextThemesProvider>
  );
}
