"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ReactElement } from "react";
import { useDashboardContext } from "../contexts/Context";
dayjs.extend(utc);
dayjs.extend(timezone);

export function DashboardSelectLimit(): ReactElement {
  /* ----------------------------- HOOKS -------------------------------- */

  const { limit, setQuery } = useDashboardContext();

  /** -------------------------- FUNCTIONS ------------------------------ */

  function handleLimitChange(val: string) {
    setQuery?.({ limit: Number(val) });
  }

  /** ---------------------------- RENDER ------------------------------- */

  return (
    <>
      <label htmlFor="timezone" className="block font-medium">
        Select Limit
      </label>
      <Select
        defaultValue={String(limit ?? 10)}
        onValueChange={handleLimitChange}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a limit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
