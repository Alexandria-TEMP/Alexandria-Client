const { expect, describe, it } = require("@jest/globals");
import Footer from "@/components/footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  it("has a divider", () => {
    render(<Footer />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
