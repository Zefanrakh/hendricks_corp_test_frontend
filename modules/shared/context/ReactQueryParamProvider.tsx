"use client";

import NextAdapterApp from "next-query-params/app";
import { ReactElement } from "react";
import { QueryParamProvider } from "use-query-params";

export function ReactQueryParamProvider({
  children,
}: {
  children: ReactElement;
}): ReactElement {
  return (
    <QueryParamProvider adapter={NextAdapterApp}>{children}</QueryParamProvider>
  );
}
