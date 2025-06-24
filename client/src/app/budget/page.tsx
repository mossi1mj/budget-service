// app/budget-editor/page.tsx

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Budget Editor – Bear Budget",
  description:
    "Create, customize, and manage your personal budget in real-time.",
};

export default function BudgetPage() {
  return (
    <section className="relative">
      {/* <div className="bg-gradient-to-br from-[color:var(--primary)] to-transparent dark:from-[color:var(--primary)] dark:via-[color:var(--secondary)] antialiased min-h-100 flex flex-col"> */}
      <div className="antialiased min-h-100 flex flex-col inset-0 -z-10 bg-gradient-to-b from-background via-primary/30 to-background dark:via-muted/20">
        <main className="min-h-screen px-6 py-12 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-slate-900">
            Edit Your Budget
          </h1>
          <p className="text-muted-foreground mb-8">
            Add, update, or remove budget items and instantly see your totals.
          </p>

          {/* Replace below with actual editor components */}
          <section className="rounded-lg border p-6 shadow-sm">
            <p className="text-sm text-gray-500">
              Your budget editor goes here...
            </p>
          </section>
        </main>
      </div>
    </section>
  );
}
