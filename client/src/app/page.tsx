"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

// Example saved budgets — replace with real data
const savedBudgets = [
  { id: 1, name: "Personal Budget", route: "/budgets/personal" },
  { id: 2, name: "Grocery Budget", route: "/budgets/grocery" },
];

export default function Home() {
  const [open, setOpen] = useState(false);

  const budgetTemplates = [
    "Blank",
    "Personal",
    "Travel",
    "Groceries",
    "Holiday",
    "Event",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-3xl font-bold text-white">Budget Tracker</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* CREATE BUDGET CARD */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-xl p-[2px] hover:scale-[1.02] transition-transform cursor-pointer">
              <Card className="aspect-video rounded-xl bg-black/90 backdrop-blur-sm">
                <CardContent className="flex h-full flex-col justify-center items-center text-white space-y-2">
                  <Plus size={32} />
                  <h2 className="text-xl font-semibold">Create a Budget</h2>
                </CardContent>
              </Card>
            </div>
          </DialogTrigger>

          {/* TEMPLATE SELECTION DIALOG */}
          <DialogContent className="max-w-md bg-background text-foreground">
            <DialogHeader>
              <DialogTitle>Select a Budget Template</DialogTitle>
              <DialogDescription>
                Choose a starting point for your new budget.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 mt-4">
              {budgetTemplates.map((template) => (
                <Link
                  key={template}
                  href="#"
                  className="rounded-lg bg-muted px-4 py-2 hover:bg-muted/70 transition text-center font-medium"
                  onClick={() => setOpen(false)}
                >
                  {template}
                </Link>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* RENDER SAVED BUDGETS */}
        {savedBudgets.map((budget) => (
          <Link key={budget.id} href={budget.route}>
            <Card className="aspect-video hover:bg-muted/70 transition rounded-xl">
              <CardContent className="flex h-full items-center justify-center text-xl font-medium text-white">
                {budget.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}