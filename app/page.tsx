"use client";

import { ReactNode } from "react";
import { DashboardIndexModule } from "@/modules/index/public/exports";

export default function Dashboard(): ReactNode | null {
  const Component = DashboardIndexModule.DashboardIndexPage;
  if (Component) {
    return <Component />;
  }
  return null;
}
