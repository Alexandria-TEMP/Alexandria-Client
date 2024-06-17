import fetchMemberData from "@/lib/api/services/member-api";
import { getReviewData } from "@/lib/api/services/review-api";
import PeerReview from "@/post/[postId]/(branch)/version/[branchId]/components/peer-review/peer-review";
import { expect, describe, it } from "@jest/globals";
import { render, waitFor, screen } from "@testing-library/react";
import { dummyMembers, dummyReview } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/review-api");
jest.mock("@/lib/api/services/member-api");

describe("PeerReview", () => {
  (fetchMemberData as jest.Mock).mockResolvedValue(dummyMembers[0]);

  it("matches snapshot", async () => {
    (getReviewData as jest.Mock).mockResolvedValue(dummyReview["accepted"]);

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
