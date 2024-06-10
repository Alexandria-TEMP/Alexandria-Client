import BranchCardHeaderSkeleton from "@/post/[postId]/(version-view)/version/[versionId]/components/branch-parts/branch-card-header-skeleton";
import { expect, describe, it } from "@jest/globals";
import { Card } from "@nextui-org/react";
import { render } from "@testing-library/react";

describe("BranchCardHeaderSkeleton", () => {
  it("matches snapshot", () => {
    const { container } = render(
      <Card>
        <BranchCardHeaderSkeleton />
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot when hiding contribute button", () => {
    const { container } = render(
      <Card>
        <BranchCardHeaderSkeleton hideContribute />
      </Card>,
    );
    expect(container).toMatchSnapshot();
  });
});
