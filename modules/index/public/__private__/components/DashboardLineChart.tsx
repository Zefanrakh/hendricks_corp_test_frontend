"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardContext } from "../contexts/Context";
dayjs.extend(utc);
dayjs.extend(timezone);

export function DashboardLineChart() {
  /* -------------------------------- HOOKS -------------------------------- */

  const { data, timezone } = useDashboardContext();

  return (
    <>
      <h2 className="text-lg font-semibold mb-2">Line Chart</h2>
      <ResponsiveContainer className="min-h-[300px] w-full">
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <YAxis dataKey="value" />
          <XAxis
            dataKey="created_at"
            tickFormatter={(value) =>
              dayjs(value)
                .tz(timezone ?? "Asia/Jakarta")
                .format("HH:mm:ss")
            }
          />
          <Tooltip
            labelFormatter={(label) => {
              return `${dayjs(label).format(
                "D MMM YYYY HH:mm:ss"
              )} ${timezone}`;
            }}
            formatter={(value) => [`${value} °C`, `Temperature`]}
          />
          <Line
            animationEasing="ease-in-out"
            type="monotone"
            dataKey="value"
            stroke="#60a5fa"
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
