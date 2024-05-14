const { expect, describe, it, beforeEach } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeSwitcher from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";

describe("Theme switcher", () => {
  beforeEach(() => {
    // This setup is needed for the ThemeProvider to work
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it("displays a sun on dark mode", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider attribute="class">
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    const moon = screen.getByTestId("theme-switcher-moon");
    if (moon) {
      await user.click(moon);
    }

    const sun = screen.getByTestId("theme-switcher-sun");
    expect(sun).toBeInTheDocument();
  });

  it("displays a moon on light mode", async () => {
    const user = userEvent.setup();
    render(
      <ThemeProvider attribute="class">
        <ThemeSwitcher />
      </ThemeProvider>,
    );

    const sun = screen.getByTestId("theme-switcher-sun");
    if (sun) {
      await user.click(sun);
    }

    const moon = screen.getByTestId("theme-switcher-moon");
    expect(moon).toBeInTheDocument();
  });
});
