const { expect, describe, it, beforeEach } = require("@jest/globals");
import HeaderSubtle from "@/components/header-subtle";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("HeaderSubtle", () => {
  it("renders its children", () => {
    const labelText = "This text should be rendered";
    render(<HeaderSubtle>{labelText}</HeaderSubtle>);

    expect(screen.getByText(labelText)).toBeInTheDocument();
  });
});
