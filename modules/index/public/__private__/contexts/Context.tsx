import { createContext, useContext } from "react";
import { DataPoint } from "../Page";
import { QueryParamConfig, SetQuery } from "use-query-params";

type DashboardContextProps = {
  data?: DataPoint[];
  timezones?: string[];
  limit?: number;
  timezone?: string;
  setQuery?: SetQuery<{
    limit: QueryParamConfig<number | null | undefined, number>;
    timezone: QueryParamConfig<string | null | undefined, string>;
  }>;
};

/* -------------------------------------------------------------------------- */
/*                             Context Provider                               */
/* -------------------------------------------------------------------------- */

export const DashboardContext = createContext<
  DashboardContextProps | undefined
>(undefined);

export const useDashboardContext = (): DashboardContextProps => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "DashboardContext must be used inside the DashboardContext.Provider"
    );
  }

  return context;
};
