import { expect } from "@jest/globals";
import { render } from "@testing-library/react";
import { dummyBranches } from "~/__tests__/__utils__/dummys";
import BranchCardMini from "@/post/[postId]/(post)/version-list/components/branch-card-mini";
import { fetchBranchReviewStatuses } from "@/lib/api/services/branch-api";
import { BranchReviewDecisionT } from "@/lib/types/api-types";

jest.mock("@/lib/api/services/branch-api");

describe("BranchCardMini", () => {
  (fetchBranchReviewStatuses as jest.Mock).mockResolvedValue([
    "approved" as BranchReviewDecisionT,
    "approved" as BranchReviewDecisionT,
    "approved" as BranchReviewDecisionT,
  ]);

  it("matches snapshot when short", async () => {
    const { container } = render(
      await BranchCardMini({
        branchUnion: dummyBranches["accepted"],
        postPathID: "something",
        short: true,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      await BranchCardMini({
        branchUnion: dummyBranches["accepted"],
        postPathID: "something",
      }),
    );
    expect(container).toMatchSnapshot();
  });
});
