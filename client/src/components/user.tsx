"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { defaultUser, useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { auth } from "@/authentication/firebase";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(defaultUser); // resets context
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const userOptions = [
    { icon: <Sparkles />, label: "Upgrade to Pro" },
    { separator: true },
    { icon: <BadgeCheck />, label: "Account" },
    { icon: <CreditCard />, label: "Billing" },
    { icon: <Bell />, label: "Notifications" },
    { separator: true },
    { icon: <LogOut />, label: "Log out", onClick: handleLogout },
  ];

  if (!user?.isAuthenticated) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button
            size="lg"
            onClick={() => router.push("/auth")}
            className="w-full"
          >
            Sign In
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.photoURL || ""}
                  alt={`${user.first_name} ${user.last_name}`}
                />
                <AvatarFallback className="rounded-lg">
                  {`${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {`${user.first_name} ${user.last_name}`}
                </span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.photoURL || ""}
                    alt={`${user.first_name} ${user.last_name}`}
                  />
                  <AvatarFallback className="rounded-lg">
                    {`${user.first_name?.[0] || ""}${
                      user.last_name?.[0] || ""
                    }`}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {`${user.first_name} ${user.last_name}`}
                  </span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userOptions.map((item, idx) =>
                item.separator ? (
                  <DropdownMenuSeparator key={`sep-${idx}`} />
                ) : (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={item.onClick ?? undefined}
                  >
                    {item.icon}
                    {item.label}
                  </DropdownMenuItem>
                )
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}