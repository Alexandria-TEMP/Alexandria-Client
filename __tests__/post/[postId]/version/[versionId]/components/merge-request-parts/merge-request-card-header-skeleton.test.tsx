import MergeRequestCardHeaderSkeleton from "@/post/[postId]/(version-view)/version/[versionId]/components/merge-request-parts/merge-request-card-header-skeleton";
import { expect, describe, it } from "@jest/globals";
import { Card } from "@nextui-org/react";
import { render } from "@testing-library/react";

describe("MergeRequestCardHeaderSkeletonTest", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <Card>
        <MergeRequestCardHeaderSkeleton />
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when hiding contribute button", () => {
    const { container } = render(
      <Card>
        <MergeRequestCardHeaderSkeleton hideContribute />
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });
});
