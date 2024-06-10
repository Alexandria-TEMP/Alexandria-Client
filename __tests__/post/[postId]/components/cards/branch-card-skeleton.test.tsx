import BranchCardSkeleton from "@/post/[postId]/components/cards/branch-card-skeleton";
import { render } from "@testing-library/react";
import { expect } from "@jest/globals";

describe("BranchCardSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(<BranchCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
