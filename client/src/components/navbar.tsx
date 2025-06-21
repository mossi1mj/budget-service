"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Moon, Panda, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { templates } from "@/lib/utils";

export function Navbar() {
  const { setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-2">
        {/* Logo - only icon shown on small screens */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-xl font-bold text-foreground"
        >
          <Panda className="h-6 w-6 transition-transform group-hover:rotate-6" />
          <span className="hidden sm:inline">Bear Budget</span>
        </Link>

        {/* Main Nav */}
        <NavigationMenu>
          <NavigationMenuList className="hidden sm:flex">
            {/* Features */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/"
                        className="flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-transparent p-6 no-underline outline-none select-none transition hover:bg-muted/70 focus:shadow-md"
                      >
                        <div className="mt-4 mb-2 text-lg font-semibold text-foreground">
                          Bear Budget
                        </div>
                        <p className="text-muted-foreground text-sm leading-tight">
                          Budget smarter with real-time insights, flexible
                          templates, and a friendly UI.
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="#" title="Build a Custom Budget">
                    Create and edit your budget without signing in— it&apos;s
                    that easy.
                  </ListItem>
                  <ListItem href="#" title="Save & Manage Budgets">
                    Sign in to save multiple budgets, access from any device,
                    and stay organized.
                  </ListItem>
                  <ListItem href="#" title="Unlock Smart Spending Insights">
                    Connect your bank to see real transactions, detect patterns,
                    and get personalized recommendations.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Templates */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {templates.map((template) => (
                    <ListItem
                      key={template.title}
                      title={template.title}
                      href={template.link}
                    >
                      {template.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Sign In */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Sign In</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-72 p-4 space-y-2">
                  <ListItem href="/signin" title="Login to Your Account">
                    Access saved budgets and track your finances across devices.
                  </ListItem>
                  <ListItem href="/signup" title="Create a New Account">
                    Save your budgets securely and pick up where you left off.
                  </ListItem>
                  <ListItem
                    href="/signup?linkBank=true"
                    title="Sign Up & Link Bank"
                  >
                    Automatically track transactions and get smart suggestions.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-popover text-popover-foreground text-white border border-border rounded-md shadow-md"
            >
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group block space-y-1 rounded-md p-3 transition-colors hover:bg-muted"
        >
          <div className="text-base font-semibold text-white group-hover:text-primary transition-colors">
            {title}
          </div>
          <p className="text-sm text-white line-clamp-2 leading-snug group-hover:text-primary transition-color">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
