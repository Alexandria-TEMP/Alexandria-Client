import { useReviewData } from "@/lib/api/hooks/review-hooks";
import PeerReview from "@/post/[postId]/(branch)/version/[branchId]/components/peer-review/peer-review";
import { expect, describe, it } from "@jest/globals";
import { render, waitFor, screen } from "@testing-library/react";
import { dummyReview } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/hooks/review-hooks");

describe("PeerReview", () => {
  it("matches snapshot", async () => {
    (useReviewData as jest.Mock).mockReturnValue({
      data: dummyReview["accepted"],
      isLoading: false,
    });

    const { container } = render(
      <PeerReview id={dummyReview["accepted"].id.toString()} />,
    );
    await waitFor(() =>
      expect(
        screen.getByText(dummyReview["accepted"].feedback),
      ).toBeInTheDocument(),
    );
    expect(container).toMatchSnapshot();
  });
});
