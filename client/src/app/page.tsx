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
import { Separator } from "@/components/ui/separator";

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
    <div className="flex flex-1 flex-col gap-4 p-4 w-[75%] mx-auto">
      <h1 className="text-3xl font-bold">Budget Tracker</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {/* CREATE BUDGET CARD */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-xl p-[2px] hover:scale-[1.02] transition-transform cursor-pointer">
              <Card className="aspect-video rounded-xl">
                <CardContent className="flex h-full flex-col justify-center items-center space-y-2 text-black dark:text-white">
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
        {savedBudgets.slice(0,5).map((budget) => (
          <Link key={budget.id} href={budget.route}>
            <Card className="aspect-video hover:bg-muted/70 transition rounded-xl">
              <CardContent className="flex h-full items-center justify-center text-xl font-medium">
                {budget.name}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      <Separator className="my-4" />
    </div>
  );
}