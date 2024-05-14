const { expect, describe, it } = require("@jest/globals");
import ButtonInline from "@/components/button-inline";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("ButtonInline", () => {
  it("shows its label", () => {
    const labelText = "This text should be rendered";
    render(<ButtonInline onClick={() => {}} label={labelText} />);

    expect(screen.getByText(labelText)).toBeInTheDocument();
  });
});
