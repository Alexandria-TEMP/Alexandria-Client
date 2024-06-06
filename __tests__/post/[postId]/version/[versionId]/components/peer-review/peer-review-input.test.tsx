import PeerReviewInput from "@/post/[postId]/(version-view)/version/[versionId]/components/peer-review/peer-review-input";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";

describe("PeerReviewInput", () => {
  it("matches snapshot", () => {
    const { container } = render(<PeerReviewInput />);
    expect(container).toMatchSnapshot();
  });

  // TODO form tests
});
