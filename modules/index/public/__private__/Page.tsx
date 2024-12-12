"use client";

import { getTimezones } from "@/modules/shared/api/getTimeZones";
import socket from "@/utils/socket";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, Suspense, useEffect, useState } from "react";
import {
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import { DashboardContext } from "./contexts/Context";
import { DashboardBarChart } from "./components/DashboardBarChart";
import { DashboardLineChart } from "./components/DashboardLineChart";
import { DashboardSelectLimit } from "./components/DashboardSelectLimit";
import { DashboardSelectTimezone } from "./components/DashboardSelectTimezone";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

export interface DataPoint {
  created_at: string;
  value: number;
}

export function Page(): ReactElement {
  /** ---------------------- HOOKS ------------------------------ */

  const [data, setData] = useState<DataPoint[]>([]);

  // Define query params
  const [{ limit, timezone }, setQuery] = useQueryParams({
    limit: withDefault(NumberParam, 10),
    timezone: withDefault(StringParam, "Asia/Jakarta"),
  });

  const { data: timezones } = useQuery({
    queryKey: ["timezones"],
    queryFn: async (): Promise<string[]> => {
      return getTimezones();
    },
    staleTime: 0,
  });

  // Fetch initial data and setup Socket.IO
  useEffect(() => {
    const fetchInitialData = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/data?limit=${0}`
      );
      const initialData: DataPoint[] = await res.json();
      setData(initialData.reverse());
    };

    fetchInitialData();

    socket.on("new-data", (newData: DataPoint) => {
      setData((prev) => [...prev, newData].slice(1));
    });
    return () => {
      socket.off("new-data");
    };
  }, [limit]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  /** ---------------------- RENDER ------------------------------ */

  return (
    <DashboardContext.Provider
      value={{
        data,
        timezones,
        timezone,
        limit,
        setQuery,
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Real-Time Temperature Dashboard
        </h1>
        <div className="mb-4">
          <DashboardSelectTimezone />
        </div>
        <div className="mb-4">
          <DashboardSelectLimit />
        </div>
        <div>
          <DashboardBarChart />
          <DashboardLineChart />
        </div>
      </div>
    </DashboardContext.Provider>
  );
}
