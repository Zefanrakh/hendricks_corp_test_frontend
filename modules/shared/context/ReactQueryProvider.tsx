"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactElement, useState } from "react";

export function ReactQueryProvider(p: {
  children: ReactElement;
}): ReactElement {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{p.children}</QueryClientProvider>
  );
}
