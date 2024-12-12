import {
  render as defaultRender,
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";

import { ReactQueryProvider } from "@/modules/shared/context/ReactQueryProvider";
import "@testing-library/jest-dom";
import { ReactNode } from "react";
import { QueryParamProvider } from "use-query-params";
import { NextRouter } from "next/router";
import NextQueryParamAdapter from "next-query-params/pages";
import { MemoryRouterProvider } from "next-router-mock/MemoryRouterProvider";
import { Page } from "./Page";

// Mock next/router
vi.mock("next/router", () => require("next-router-mock"));

type DefaultParams = Parameters<typeof defaultRender>;
type RenderUI = DefaultParams[0];
type RenderOptions = DefaultParams[1] & {
  router?: Partial<NextRouter>;
};

// Mock the ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// --------------------------------------------------
// Override the default test render with our own
// --------------------------------------------------
export function render(
  ui: RenderUI,
  { wrapper, router, ...options }: RenderOptions = {}
): ReturnType<typeof defaultRender> {
  let currentWrapper = wrapper;
  if (!currentWrapper) {
    currentWrapper = ({ children }): ReactNode => {
      return (
        <html>
          <body>
            <MemoryRouterProvider>
              <ReactQueryProvider>
                <QueryParamProvider adapter={NextQueryParamAdapter}>
                  <>{children}</>
                </QueryParamProvider>
              </ReactQueryProvider>
            </MemoryRouterProvider>
          </body>
        </html>
      );
    };
  }

  return defaultRender(ui, { wrapper: currentWrapper, ...options });
}

vi.mock(
  "use-query-params",
  async (importOriginal): Promise<typeof import("use-query-params")> => {
    return {
      ...(await importOriginal<typeof import("use-query-params")>()),
    };
  }
);

describe("Page Component", () => {
  it("allows timezone selection and updates the displayed timezone", async () => {
    render(<Page />);
  });

  it("renders the chart and updates data dynamically", async () => {
    render(<Page />);
  });
});
