"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ReactElement } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardContext } from "../contexts/Context";
dayjs.extend(utc);
dayjs.extend(timezone);

export function DashboardBarChart(): ReactElement {
  /* -------------------------------- HOOKS -------------------------------- */

  const { data, timezone } = useDashboardContext();

  /* -------------------------------- RENDER ------------------------------- */

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Bar Chart</h2>
      <ResponsiveContainer className="min-h-[400px] w-full">
        <BarChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <YAxis dataKey="value" />
          <XAxis
            dataKey="created_at"
            tickFormatter={(value) => {
              return dayjs(value)
                .tz(timezone ?? "Asia/Jakarta")
                .format("HH:mm:ss");
            }}
          />
          <Tooltip
            labelFormatter={(label) => {
              return `${dayjs(label).format(
                "D MMM YYYY HH:mm:ss"
              )} ${timezone}`;
            }}
            formatter={(value) => [`${value} °C`, `Temperature`]}
          />
          <Bar
            animationEasing="ease-in-out"
            dataKey="value"
            fill="#60a5fa"
            radius={4}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
