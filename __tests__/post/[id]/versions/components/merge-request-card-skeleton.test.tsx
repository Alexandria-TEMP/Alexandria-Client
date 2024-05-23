import MergeRequestCardSkeleton from "@/post/[id]/versions/components/merge-request-card-skeleton";
import { render } from "@testing-library/react";
import { expect } from "@jest/globals";

describe("MergeRequestCardSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(<MergeRequestCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
