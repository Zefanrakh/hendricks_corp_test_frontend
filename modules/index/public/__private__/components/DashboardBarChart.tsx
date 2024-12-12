"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ReactElement } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDashboardContext } from "../contexts/Context";
import { GradientDefinitions } from "@/modules/shared/utils/GradientDefinitions";
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
          {Array.from(Array(100).keys()).map((num) => (
            <defs key={`graddef${num}`}>
              <linearGradient
                id={`grad${num}`}
                x1="0%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <GradientDefinitions chartValue={num} />
              </linearGradient>
            </defs>
          ))}
          <Legend
            verticalAlign="top"
            payload={[
              {
                value: (
                  <p className="text-gray-600 mb-2">
                    Colors indicate temperature
                  </p>
                ),
                legendIcon: <></>,
              },
            ]}
          />
          <Bar animationEasing="ease-in-out" dataKey="value" radius={4}>
            {data?.map(({ value }, index) => (
              <>
                {/* Use gradient definitions with the following format: grad + value. */}
                <Cell key={`cell-${index}`} fill={`url(#grad${value})`}></Cell>
              </>
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
