import ReviewChip from "@/post/[id]/versions/components/review-chip";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

describe("ReviewChip", () => {
  it("renders accepted", () => {
    render(<ReviewChip status="accept" />);
    expect(screen.getByTestId("review-chip-accept")).toBeInTheDocument();
  });
  it("renders rejected", () => {
    render(<ReviewChip status="reject" />);
    expect(screen.getByTestId("review-chip-reject")).toBeInTheDocument();
  });
  it("renders open", () => {
    render(<ReviewChip status="open" />);
    expect(screen.getByTestId("review-chip-open")).toBeInTheDocument();
  });
});
