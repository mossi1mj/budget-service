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
import { usePlaidTransactions } from "@/hooks/use-transactions";
import { auth } from "@/authentication/firebase";
import { useUserContext } from "@/context/UserContext";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
  SortingState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";

export type Transaction = {
  transaction_id: string;
  date: string;
  name: string;
  amount: number;
  iso_currency_code: string;
  personal_finance_category?: {
    primary: string;
    detailed: string;
  };
  pending: boolean;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "date",
    header: "Date",
    enableSorting: true,
  },
  {
    accessorKey: "name",
    header: "Name",
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    enableSorting: true,
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <span className={amount < 0 ? "text-red-500" : "text-green-600"}>
          {amount < 0 ? "-" : "+"}${Math.abs(amount).toFixed(2)}
        </span>
      );
    },
  },
  {
    accessorKey: "personal_finance_category.primary",
    header: "Category",
    enableSorting: true,
    cell: ({ row }) => row.original.personal_finance_category?.primary || "—",
  },
  {
    accessorKey: "pending",
    header: "Status",
    enableSorting: true,
    cell: ({ row }) =>
      row.original.pending ? (
        <span className="text-yellow-600">Pending</span>
      ) : (
        <span className="text-green-600">Posted</span>
      ),
  },
];

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="rounded-md border mt-4">
      <div className="p-2">
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="cursor-pointer select-none"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : ""}
                  {header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}


// Example saved budgets — replace with real data
const savedBudgets = [
  { id: 1, name: "Personal", route: "/budgets/personal" },
  { id: 2, name: "Grocery", route: "/budgets/grocery" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { user } = useUserContext();

  useState(() => {
    const result = auth.currentUser?.getIdToken().then((resolvedToken) => {
      setToken(resolvedToken || null);
    });
    console.log("Current user token:", result);
    return result;
  }, []);

  const { transactions, isLoading, isError } = usePlaidTransactions(token);

  console.log("Transactions:", transactions);

  const budgetTemplates = [
    {
      name: "Blank",
      imageUrl: "/icons/plus-icon.svg", // or use a minimal blank image/icon
    },
    {
      name: "Personal",
      imageUrl: "https://images.unsplash.com/photo-1523289333742-bea4f3f3e5b1", // person lifestyle
    },
    {
      name: "Travel",
      imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", // beach
    },
    {
      name: "Groceries",
      imageUrl: "https://images.unsplash.com/photo-1606813909227-0cc2f05f0c1a", // groceries
    },
    {
      name: "Holiday",
      imageUrl: "https://images.unsplash.com/photo-1608889171080-57f7c87b5b94", // Christmas lights
    },
    {
      name: "Bills",
      imageUrl: "https://images.unsplash.com/photo-1588776814546-ec7d3e4425fb", // calculator/bills
    },
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
          {/* {<DialogContent className="max-w-md bg-background text-foreground">
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
          </DialogContent>} */}
          {/* TEMPLATE SELECTION DIALOG */}
          <DialogContent className="max-w-2xl bg-background text-foreground">
            <DialogHeader>
              <DialogTitle>Select a Budget Template</DialogTitle>
              <DialogDescription>
                Choose a starting point for your new budget.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              {budgetTemplates.map((template) => (
                <div
                  key={template.name}
                  className="group relative rounded-xl overflow-hidden shadow ring-1 ring-muted bg-muted"
                >
                  <img
                    src={template.imageUrl}
                    alt={template.name}
                    className="object-cover w-full h-32 transition group-hover:blur-sm"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition">
                    <button className="text-white font-semibold bg-black/60 rounded px-3 py-1">
                      Use template
                    </button>
                  </div>

                  {/* Label below image */}
                  <div className="mt-2 text-center font-medium text-sm bg-muted/70 py-1 text-foreground rounded-b-xl">
                    {template.name}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* RENDER SAVED BUDGETS */}
        {savedBudgets.slice(0, 5).map((budget) => (
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
      {isLoading && (
        <div className="space-y-2">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Failed to load transactions.</AlertDescription>
        </Alert>
      )}

      {user?.isAuthenticated && !isLoading && !isError && transactions?.length > 0 && (
        <DataTable columns={columns} data={transactions} />
      )}
    </div>
  );
}
