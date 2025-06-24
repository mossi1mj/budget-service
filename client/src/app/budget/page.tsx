"use client";

import { useState, useMemo } from "react";

import { Save, Plus, Trash2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Label, Pie, PieChart } from "recharts";


type BudgetItem = {
  id: number;
  category: string;
  amount: string;
  notes: string;
};

export default function BudgetPage() {
  const [items, setItems] = useState<BudgetItem[]>([
    { id: 1, category: "Groceries", amount: "120", notes: "Weekly essentials" },
    { id: 2, category: "Rent", amount: "800", notes: "Monthly apartment rent" },
  ]);

  const budgetGoal = 2000;
  const totalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [items]);

  const handleChange = <K extends keyof BudgetItem>(
    id: number,
    field: K,
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const addNewItem = () => {
    const newId = Date.now();
    setItems((prev) => [
      ...prev,
      { id: newId, category: "", amount: "", notes: "" },
    ]);
  };

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const percentageUsed = Math.min((totalAmount / budgetGoal) * 100, 100);


const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Firefox",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Edge",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const totalVisitors = useMemo(() => {
  return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
}, []);

  return (
    <section className="relative">
      <div className="antialiased min-h-screen flex flex-col bg-gradient-to-b from-background via-primary/10 to-background dark:via-muted/10">
        <main className="mx-auto w-full max-w-7xl px-6 py-10 flex-1">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              Edit Your Budget
            </h1>
            <p className="text-muted-foreground">
              Add, update, or remove budget items and instantly see your totals.
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center mb-6">
            <Button variant="outline" onClick={addNewItem} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Budget Item
            </Button>
            <Button variant="default" className="gap-2">
              <Save className="w-4 h-4" />
              Save Budget
            </Button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">
            {/* Editable Table */}
            <div className="rounded-lg border bg-white/70 dark:bg-muted/40 backdrop-blur p-4 shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold text-foreground">
                      Category
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Notes
                    </TableHead>
                    <TableHead className="text-right font-semibold text-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.category}
                          placeholder="Category"
                          onChange={(e) =>
                            handleChange(item.id, "category", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.amount}
                          placeholder="0"
                          onChange={(e) =>
                            handleChange(item.id, "amount", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Textarea
                          rows={1}
                          value={item.notes}
                          placeholder="Notes"
                          onChange={(e) =>
                            handleChange(item.id, "notes", e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Chart */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <CardTitle>Pie Chart - Donut with Text</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer
                  config={chartConfig}
                  className="mx-auto aspect-square max-h-[250px]"
                >
                  <PieChart width={250} height={250}>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={chartData}
                      dataKey="visitors"
                      nameKey="browser"
                      innerRadius={60}
                      outerRadius={100}
                      strokeWidth={5}
                      cx={125}
                      cy={125}
                    />
                    <text
                      x={130}
                      y={135}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan className="fill-foreground text-3xl font-bold">
                        {`$${totalVisitors.toLocaleString()}`}
                      </tspan>
                      {/* <tspan
                        x={130}
                        dy="1.8em"
                        className="fill-muted-foreground text-sm"
                      >
                        Visitors
                      </tspan> */}
                    </text>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Showing total visitors for the last 6 months
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </section>
  );
}
