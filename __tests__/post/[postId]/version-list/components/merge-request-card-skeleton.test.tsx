import MergeRequestCardSkeleton from "@/post/[postId]/(main-post-view)/version-list/components/merge-request-card-skeleton";
import { render } from "@testing-library/react";
import { expect } from "@jest/globals";

describe("MergeRequestCardSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(<MergeRequestCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
