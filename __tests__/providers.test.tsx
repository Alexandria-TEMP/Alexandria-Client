import { expect, describe, it, beforeEach } from "@jest/globals";
import { Providers } from "@/providers";
import { render, screen } from "@testing-library/react";
import themeProviderSetup from "./__utils__/theme-provider-setup";

describe("Providers", () => {
  beforeEach(themeProviderSetup);

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
