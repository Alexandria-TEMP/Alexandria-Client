import { expect } from "@jest/globals";
import {
  getBranchData,
  getBranchReviewStatuses,
} from "@/lib/api-calls/merge-request-api";
import MergeRequestCard from "@/post/[postId]/(main-post-view)/version-list/components/merge-request-card";
import { act, render, screen, waitFor } from "@testing-library/react";
import { dummyBranches } from "~/__tests__/__utils__/dummys";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/api-calls/merge-request-api");

// Mock useRouter to spy on push
const routerPushMock = jest.fn().mockName("router.push()");
jest.mock("next/navigation");

describe("MergeRequestCard", () => {
  (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  (getBranchData as jest.Mock).mockResolvedValue(dummyBranches["open"]);
  (getBranchReviewStatuses as jest.Mock).mockResolvedValue([
    "open",
    "open",
    "open",
  ]);

  beforeEach(async () => {
    // disable reason: we need this to wait for a change in MergeRequestCard
    // but since there's no explicit await in the block, eslint doesn't like it
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      render(
        <MergeRequestCard
          id={dummyBranches["open"].id.toString()}
          postId={dummyBranches["open"].projectPostID}
        />,
      );
    });
  });

  it("shows review chips", async () => {
    await waitFor(() => {
      const chips = screen.getAllByTestId("review-chip", { exact: false });
      expect(chips).toHaveLength(3);
    });
  });

  it("shows title", () => {
    const title = screen.getByText(dummyBranches["open"].branchTitle);
    expect(title).toBeInTheDocument();
  });

  it("navigates on click", async () => {
    const title = screen.getByText(dummyBranches["open"].branchTitle);

    const user = userEvent.setup();
    await user.click(title);

    expect(routerPushMock).toHaveBeenCalledWith(
      `/post/${dummyBranches["open"].projectPostID}/version/${dummyBranches["open"].id}`,
    );
  });
});
