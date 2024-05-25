import { expect, describe, it, beforeEach } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeSwitcher from "@/components/theme-switcher";
import { ThemeProvider } from "next-themes";
import themeProviderSetup from "../__utils__/theme-provider-setup";

describe("Theme switcher", () => {
  beforeEach(themeProviderSetup);

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
