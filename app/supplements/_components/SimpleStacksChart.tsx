"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";

import { cn } from "@/lib/utils";

import {
  simpleStackChartCategories,
  simpleStackChartStacks,
  type SimpleStackChartCategoryKey,
  type SimpleStackChartDatum,
} from "../_data/simple-stacks-data";

const yAxisTicks = [3, 4, 5, 6, 7, 8, 9, 10];

function SimpleStackTooltip({
  active,
  payload,
}: TooltipContentProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const datum = payload[0]?.payload as SimpleStackChartDatum | undefined;
  const value = Number(payload[0]?.value ?? datum?.score ?? 0);

  if (!datum) {
    return null;
  }

  return (
    <div className="rounded-[4px] border border-foreground/20 bg-background/95 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.24)] backdrop-blur-sm">
      <p className="font-heading text-[11px] leading-[1.4] text-foreground">
        {datum.name}
      </p>
      <p className="mt-1 font-mono text-[12px] leading-[1.4] text-accent">
        {value.toFixed(1)} / 10
      </p>
    </div>
  );
}

export function SimpleStacksChart() {
  const [activeCategory, setActiveCategory] =
    useState<SimpleStackChartCategoryKey>("general");

  const chartData = useMemo<SimpleStackChartDatum[]>(
    () =>
      simpleStackChartStacks.map((stack) => ({
        ...stack,
        score: stack.scores[activeCategory],
      })),
    [activeCategory],
  );

  return (
    <section className="mb-16 sm:mb-24">
      <div className="rounded-[4px] border border-foreground/20 bg-background/60 p-4 shadow-[0_0_0_1px_rgba(198,198,198,0.04)] backdrop-blur-[2px] sm:p-6 lg:p-7">
        <div className="mb-5 flex flex-col gap-2 sm:mb-6">
          <p className="font-heading text-[10px] uppercase tracking-[0.25em] text-accent sm:text-xs">
            Porównanie
          </p>
          <h2 className="font-heading text-[18px] leading-[1.3] font-normal text-foreground sm:text-[24px] md:text-[28px]">
            Porównanie ze wszystkimi stackami
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          {simpleStackChartCategories.map((category) => {
            const isActive = category.key === activeCategory;

            return (
              <button
                key={category.key}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveCategory(category.key)}
                className={cn(
                  "rounded-[4px] border px-3 py-2 font-heading text-[9px] uppercase tracking-[0.12em] transition-colors sm:px-4 sm:text-[10px]",
                  isActive
                    ? "border-accent/70 bg-foreground/12 text-foreground"
                    : "border-foreground/20 bg-transparent text-foreground/75 hover:border-accent/50 hover:text-accent",
                )}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 sm:mt-6">
          {simpleStackChartStacks.map((stack) => (
            <div
              key={stack.name}
              className={cn(
                "flex items-center gap-2 font-body text-[11px] leading-none text-foreground/75 sm:text-[12px]",
                stack.isNew && "font-semibold text-foreground",
              )}
            >
              <span
                className={cn(
                  "h-2.5 w-2.5 rounded-sm",
                  stack.isNew && "ring-1 ring-accent/70 ring-offset-2 ring-offset-background",
                )}
                style={{ backgroundColor: stack.color }}
                aria-hidden="true"
              />
              <span>{stack.name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 h-[340px] w-full sm:h-[460px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={0}
            initialDimension={{ width: 760, height: 460 }}
          >
            <BarChart
              data={chartData}
              margin={{ top: 8, right: 8, bottom: 30, left: -18 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="rgba(198,198,198,0.1)"
                strokeDasharray="3 3"
              />
              <XAxis
                dataKey="name"
                angle={-35}
                axisLine={false}
                height={72}
                interval={0}
                tick={{ fill: "rgba(198,198,198,0.58)", fontSize: 10 }}
                tickLine={false}
                textAnchor="end"
              />
              <YAxis
                axisLine={false}
                domain={[3, 10]}
                ticks={yAxisTicks}
                tick={{ fill: "rgba(198,198,198,0.58)", fontSize: 11 }}
                tickLine={false}
                width={38}
              />
              <Tooltip
                content={(props) => <SimpleStackTooltip {...props} />}
                cursor={{ fill: "rgba(198,198,198,0.04)" }}
              />
              <Bar dataKey="score" radius={[4, 4, 0, 0]} maxBarSize={48}>
                {chartData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
