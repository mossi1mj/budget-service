"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { features, templates } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <section className="relative">
        <div className="absolute -top-56 -left-72 w-[900px] h-[550px] rounded-md blur-3xl -z-10 bg-gradient-to-br from-[color:var(--primary)] via-[color:var(--secondary)] to-transparent dark:from-[color:var(--primary)] dark:via-[color:var(--secondary)]"></div>

        <div className="mx-auto max-w-3xl px-6 pt-28 pb-20 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-foreground fade-in-up">
            Smarter Finance with Bear Budget
          </h1>
          <p className="mt-6 max-w-xl mx-auto fade-in-up delay-1 bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] to-[color:var(--muted-foreground)] drop-shadow-sm">
            Create a budget in minutes, cut the noise, and see your money in
            real-time— without complex spreadsheets or fees.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center fade-in-up delay-2">
            <Button className="h-12 text-md px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-medium text-white bg-gradient-to-r from-[color:var(--primary)] to-[color:var(--secondary)] hover:shadow-xl hover:scale-[1.02] transition-all duration-300 shadow-lg">
              Start Budgeting
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 py-3 rounded-xl text-md"
            >
              Browse Templates
            </Button>
          </div>
        </div>
      </section>

      <section id="templates" className="mx-auto max-w-7xl px-6 mt-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center text-foreground fade-in-up">
          Explore Templates
        </h2>

        <div className="mt-12 flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 fade-in-up delay-1">
          {templates.map((template, index) => (
            <Card
              key={index}
              className="min-w-[16rem] md:min-w-[18rem] snap-center border border-border hover:border-[color:var(--primary)] transition shadow-sm"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-md bg-muted flex items-center justify-center mb-4">
                  <template.icon className="w-6 h-6 text-foreground" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  {template.title}
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0">
                <Link
                  href={template.link}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline focus-visible:outline-offset-2"
                  aria-label={`Use ${template.title} template`}
                >
                  Use Template
                  <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-6 pb-24 fade-in-up delay-2"
      >
        <ul className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm text-muted-foreground pt-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center space-x-2 hover:text-foreground transition-colors"
            >
              <feature.icon className="w-4 h-4 text-foreground text-md" />
              <span>{feature.title}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}