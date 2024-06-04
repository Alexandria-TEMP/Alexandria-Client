import {
  render,
  screen,
  waitFor,
  within,
  fireEvent,
  act,
} from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import GenericLoadingPage from "@/components/loading-page";

describe("Generic loading screen tests", () => {
  it("renders", () => {
    render(<GenericLoadingPage />);

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });
});
