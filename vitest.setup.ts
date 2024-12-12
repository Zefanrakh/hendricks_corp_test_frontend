// This file is loaded before tests run. Use it to set up the testing environment.
import "@testing-library/jest-dom"; // Extend Jest matchers with DOM assertions
import { loadEnvFile } from "process";

// Mock next/router globally
import { vi } from "vitest";

loadEnvFile('.env.local');

vi.mock("next/router", () => require("next-router-mock"));

// Add additional global setup logic here if needed
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    pathname: "/",
    query: {},
    asPath: "/",
  }),
}));
