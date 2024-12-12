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
import { useDashboardContext } from "../contexts/Context";
dayjs.extend(utc);
dayjs.extend(timezone);

export function DashboardSelectTimezone() {
  /* ----------------------------- HOOKS -------------------------------- */

  const { timezones, timezone, setQuery } = useDashboardContext();

  /** -------------------------- FUNCTIONS ------------------------------ */

  function handleTimezoneChange(val: string) {
    setQuery?.({ timezone: val });
  }

  /** ---------------------------- RENDER ------------------------------- */
  return (
    <>
      <label htmlFor="timezone" className="block font-medium">
        Select Timezone
      </label>
      <Select
        defaultValue={timezone ?? "Asia/Jakarta"}
        onValueChange={handleTimezoneChange}
      >
        <SelectTrigger data-testid="select_timezone">
          <SelectValue placeholder="Select a timezone" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {timezones?.map((tz) => (
              <SelectItem value={tz} key={tz} data-testid={tz}>
                {tz}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
