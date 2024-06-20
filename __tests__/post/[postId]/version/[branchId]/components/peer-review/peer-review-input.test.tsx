import PeerReviewInput from "@/post/[postId]/(branch)/version/[branchId]/components/peer-review/peer-review-input";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";

jest.mock("next/navigation");

describe("PeerReviewInput", () => {
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());

  it("matches snapshot", () => {
    const { container } = render(<PeerReviewInput branchID={1} postID={1} />);
    expect(container).toMatchSnapshot();
  });

  // TODO form tests
});
