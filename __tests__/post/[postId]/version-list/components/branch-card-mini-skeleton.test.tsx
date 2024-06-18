import { render } from "@testing-library/react";
import { expect } from "@jest/globals";
import BranchCardMiniSkeleton from "@/post/[postId]/(post)/version-list/components/branch-card-mini-skeleton";

describe("BranchCardSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(<BranchCardMiniSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
