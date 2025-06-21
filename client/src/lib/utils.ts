import { clsx, type ClassValue } from "clsx";
import { Activity, Clock, Plane, Shield, ShoppingCart, Wallet, Zap } from "lucide-react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const templates = [
  {
    icon: Wallet,
    title: "Personal",
    description:
      "Track income, bills, and daily spending with crystal clarity.",
    link: "#",
  },
  {
    icon: Plane,
    title: "Travel",
    description:
      "Plan your trips, manage expenses, and keep track of your adventures.",
    link: "#",
  },
  {
    icon: ShoppingCart,
    title: "Shopping",
    description:
      "Organize your shopping lists, track expenses, and stick to your budget effortlessly.",
    link: "#",
  },
  {
    icon: Activity,
    title: "Event",
    description:
      "Plan events, manage budgets, and ensure everything runs smoothly without financial stress.",
    link: "#",
  },
];

export const features = [
  {
    title: "2-minute Setup",
    icon: Clock,
  },
  {
    title: "Private & Secure",
    icon: Shield,
  },
  {
    title: "Real-time Insights",
    icon: Zap,
  },
];
