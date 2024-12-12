import { Page } from "./__private__/Page";

// always export as partial, so caller prepared when modules not available
type Exported = Partial<{
  DashboardIndexPage: typeof Page;
}>;

export const DashboardIndexModule: Exported = {
  // to disable module, simply comment out any exports below
  DashboardIndexPage: Page,
};
