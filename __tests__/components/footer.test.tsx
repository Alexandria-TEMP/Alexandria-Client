import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/footer";

describe("Footer", () => {
  it("has a divider", () => {
    render(<Footer />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
