import { render, screen } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import GenericLoadingPage from "@/loading";

describe("Generic loading screen tests", () => {
  it("renders", () => {
    render(<GenericLoadingPage />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
