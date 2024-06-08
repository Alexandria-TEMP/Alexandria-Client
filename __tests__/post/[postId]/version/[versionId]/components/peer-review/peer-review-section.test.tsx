import PeerReviewSection from "@/post/[postId]/(version-view)/version/[versionId]/components/peer-review/peer-review-section";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import PeerReview from "@/post/[postId]/(version-view)/version/[versionId]/components/peer-review/peer-review";

jest.mock(
  "@/post/[postId]/(version-view)/version/[versionId]/components/peer-review/peer-review",
);

describe("PeerReviewSection", () => {
  it("matches snapshot", () => {
    // Mock peer reviews to test only the wrapper
    (PeerReview as jest.Mock)
      .mockReturnValueOnce(<p>First review</p>)
      .mockReturnValueOnce(<p>Second review</p>)
      .mockReturnValueOnce(<p>Third review</p>);

    const { container } = render(<PeerReviewSection reviewIDs={[1, 2, 3]} />);
    expect(container).toMatchSnapshot();
  });
});
