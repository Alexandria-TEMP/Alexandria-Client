import { expect, describe, it } from "@jest/globals";
import NotLoggedInError from "@/components/common/logged-in-error";
import { render, screen } from "@testing-library/react";

describe("NotLoggedInError", () => {
  it("renders its children", () => {
    const { container } = render(<NotLoggedInError />);
    expect(container).toMatchSnapshot();
  });
});
