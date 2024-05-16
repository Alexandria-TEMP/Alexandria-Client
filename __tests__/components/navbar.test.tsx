const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AlexandriaNavbar, { navigationItems } from "@/components/navbar";
import userEvent from "@testing-library/user-event";
import { RouterContext } from "next/dist/shared/lib/router-context.shared-runtime";
import createMockRouter from "../__utils__/create-mock-router";

describe("Navbar", () => {
  it("includes the theme switcher", () => {
    render(<AlexandriaNavbar />);
    expect(
      screen.getByTestId("theme-switcher", { exact: false }),
    ).toBeInTheDocument();
  });

  // Returns an anonymous function which tests navigation
  const generateNavigationTest = (href: string, label: string) => async () => {
    // We mock a router for Link to work
    const router = createMockRouter();
    render(
      // Give the component access to the router via RouterContext.Provider
      <RouterContext.Provider value={router}>
        <AlexandriaNavbar />
      </RouterContext.Provider>,
    );

    const button = screen.getByText(label, { exact: false });

    const user = userEvent.setup();
    await user.click(button);

    expect(router.push).toHaveBeenCalledWith(
      href,
      // Next two parameters are used internally by Link, but we don't care about them
      expect.anything(),
      expect.anything(),
    );
  };

  // For each navigation item, generate a test that ensures it navigates to the correct place
  navigationItems.map(({ href, label }) =>
    it(`navigates to ${label}`, generateNavigationTest(href, label)),
  );
});
