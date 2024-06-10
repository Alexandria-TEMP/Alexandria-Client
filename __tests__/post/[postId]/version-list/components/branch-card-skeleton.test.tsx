import BranchCardSkeleton from "@/post/[postId]/(main-post-view)/version-list/components/branch-card-skeleton";
import { render } from "@testing-library/react";
import { expect } from "@jest/globals";

describe("BranchCardSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(<BranchCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
