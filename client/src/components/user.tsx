"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Landmark,
  LogOut,
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
import { toast } from "sonner";
import { defaultUser, useUserContext } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { auth } from "@/authentication/firebase";
import { useEffect, useState } from "react";
import { PlaidService } from "@/lib/openapi";
import { usePlaidLink } from "react-plaid-link";

export function NavUser() {
  const { isMobile } = useSidebar();
  const { user, setUser } = useUserContext();
  const router = useRouter();

  const [linkToken, setLinkToken] = useState<string | null>(null);

  // Create Plaid Link Token
  const createLinkToken = async () => {
    if (!user) {
      toast.error("User must be signed in");
      return;
    }

    const token = await auth.currentUser?.getIdToken();
    console.log("Current user token:", token);
    if (!token) {
      return toast.error("User must be authenticated");
    }

    try {
      const response =
        await PlaidService.createLinkTokenPlaidCreateLinkTokenPost(
          user.uid,
          `Bearer ${token}`
        );
      setLinkToken(response.link_token);
    } catch (err) {
      console.error("Failed to create Plaid link token:", err);
      toast.error("Failed to start bank linking");
    }
  };

  // Use Plaid Link hook
  const { open, ready } = usePlaidLink({
    token: linkToken || "",
    onSuccess: async (public_token: string) => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
          toast.error("Authentication required to link bank");
          return;
        }

        await PlaidService.exchangeTokenPlaidExchangePublicTokenPost(
          public_token,
          `Bearer ${token}`
        );
        toast.success("Bank connected successfully!");
        setLinkToken(null);
      } catch (error) {
        console.error("Failed to exchange public token:", error);
        toast.error("Failed to connect bank");
      }
    },

    onExit: (error) => {
      if (error) {
        toast.error(`Plaid linking exited: ${error.error_message}`);
      }
      setLinkToken(null);
    },
  });

  const handleConnectBankClick = async () => {
    if (!linkToken) {
      await createLinkToken();
    }
  };

  // Effect: open Plaid Link modal when linkToken is set
  useEffect(() => {
    if (linkToken && ready) {
      open();
    }
  }, [linkToken, ready, open]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(defaultUser); // resets context
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const userOptions = [
    {
      icon: <Landmark />,
      label: "Connect Bank",
      onClick: handleConnectBankClick,
    },
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
