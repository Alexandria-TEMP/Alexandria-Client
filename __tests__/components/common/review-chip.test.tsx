import ReviewChip from "@/components/common/review-chip";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

describe("ReviewChip", () => {
  it("renders accepted", () => {
    render(<ReviewChip status="approved" />);
    expect(screen.getByTestId("review-chip-accept")).toBeInTheDocument();
  });
  it("renders rejected", () => {
    render(<ReviewChip status="rejected" />);
    expect(screen.getByTestId("review-chip-reject")).toBeInTheDocument();
  });
  it("renders open", () => {
    render(<ReviewChip status={undefined} />);
    expect(screen.getByTestId("review-chip-open")).toBeInTheDocument();
  });
});
