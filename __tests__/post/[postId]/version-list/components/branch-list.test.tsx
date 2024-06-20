import BranchList from "@/post/[postId]/(post)/version-list/components/branch-list";
import BranchCardMini from "@/post/[postId]/(post)/version-list/components/branch-card-mini";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { dummyBranches } from "~/__tests__/__utils__/dummys";
import { fetchOrderedBranches } from "@/lib/api/services/branch-api";

jest.mock("@/lib/api/services/branch-api");
jest.mock("@/post/[postId]/(post)/version-list/components/branch-card-mini");

describe("BranchList", () => {
  (BranchCardMini as jest.Mock).mockReturnValue(<p>Card</p>);

  it("matches snapshot", async () => {
    (fetchOrderedBranches as jest.Mock).mockResolvedValue([
      dummyBranches["accepted"],
      dummyBranches["accepted"],
      dummyBranches["accepted"],
    ]);

    const { container } = render(
      await BranchList({
        branchUnionIDs: [
          { id: 1, isClosed: false },
          { id: 2, isClosed: false },
          { id: 3, isClosed: false },
        ],
        postPathID: "somepath",
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it("grid matches snapshot", async () => {
    (fetchOrderedBranches as jest.Mock).mockResolvedValue([
      dummyBranches["accepted"],
      dummyBranches["accepted"],
      dummyBranches["accepted"],
    ]);

    const { container } = render(
      await BranchList({
        branchUnionIDs: [
          { id: 1, isClosed: false },
          { id: 2, isClosed: false },
          { id: 3, isClosed: false },
        ],
        postPathID: "somepath",
        grid: true,
      }),
    );
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot with no branches", async () => {
    (fetchOrderedBranches as jest.Mock).mockResolvedValue([]);
    const { container } = render(
      await BranchList({
        branchUnionIDs: [],
        postPathID: "somepath",
      }),
    );
    expect(container).toMatchSnapshot();
  });
});
