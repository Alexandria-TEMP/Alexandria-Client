import { render } from "@testing-library/react";
import { expect, describe, it } from "@jest/globals";
import PostPreviewCardSkeleton from "@/(home)/components/post-preview-card-skeleton";

describe("PostPreviewCard", () => {
  it("matches snapshot", () => {
    const { container } = render(<PostPreviewCardSkeleton />);
    expect(container).toMatchSnapshot();
  });
});
