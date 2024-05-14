const { expect, describe, it, beforeEach } = require("@jest/globals");
import { Providers } from "@/providers";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Providers", () => {
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

  it("renders its children", () => {
    const headerText = "Providers test text...";
    const buttonText = "Button inside Providers";

    render(
      <Providers>
        <h1>{headerText}</h1>
        <button>{buttonText}</button>
      </Providers>,
    );

    const heading = screen.getByRole("heading", { name: headerText });
    const button = screen.getByRole("button", { name: buttonText });

    expect(heading).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});
