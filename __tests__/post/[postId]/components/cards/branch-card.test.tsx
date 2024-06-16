import { expect } from "@jest/globals";
import {
  fetchBranchData,
  getBranchReviewStatuses,
} from "@/lib/api/services/branch-api";
import { act, render, screen, waitFor } from "@testing-library/react";
import { dummyBranches } from "~/__tests__/__utils__/dummys";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import BranchCard from "@/post/[postId]/components/cards/branch-card";

jest.mock("@/lib/api/services/branch-api");

// Mock useRouter to spy on push
const routerPushMock = jest.fn().mockName("router.push()");
jest.mock("next/navigation");

describe("BranchCard", () => {
  (useRouter as jest.Mock).mockReturnValue({ push: routerPushMock });
  (fetchBranchData as jest.Mock).mockResolvedValue(dummyBranches["open"]);
  (getBranchReviewStatuses as jest.Mock).mockResolvedValue([
    "open",
    "open",
    "open",
  ]);

  beforeEach(async () => {
    // disable reason: we need this to wait for a change in BranchCard
    // but since there's no explicit await in the block, eslint doesn't like it
    // eslint-disable-next-line @typescript-eslint/require-await
    await act(async () => {
      render(
        <BranchCard
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
