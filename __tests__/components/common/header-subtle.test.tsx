import { expect, describe, it } from "@jest/globals";
import HeaderSubtle from "@/components/common/header-subtle";
import { render, screen } from "@testing-library/react";

describe("HeaderSubtle", () => {
  it("renders its children", () => {
    const labelText = "This text should be rendered";
    render(<HeaderSubtle>{labelText}</HeaderSubtle>);

    expect(screen.getByText(labelText)).toBeInTheDocument();
  });
});
