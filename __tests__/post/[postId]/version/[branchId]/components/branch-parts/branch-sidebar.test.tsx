import BranchSidebar from "@/post/[postId]/(branch)/version/[branchId]/components/branch-parts/branch-sidebar";
import ChipList from "@/components/common/chip-list";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { fetchBranchData } from "@/lib/api/services/branch-api";
import { dummyBranches } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/branch-api");
jest.mock("@/components/common/chip-list");
jest.mock("@/post/[postId]/components/cards/author-card-list");
jest.mock("@/post/[postId]/components/cards/post-card-mini");

describe("BranchSidebarTest", () => {
  (fetchBranchData as jest.Mock).mockReturnValue(dummyBranches["accepted"]);
  (ChipList as jest.Mock).mockReturnValue(<p>ChipList</p>);
  (AuthorCardList as jest.Mock).mockReturnValue(<p>AuthorCardList</p>);
  (PostCardMini as jest.Mock).mockReturnValue(<p>PostCardMini</p>);

  it("matches snapshot", async () => {
    const { container } = render(await BranchSidebar({ id: "1" }));
    expect(container).toMatchSnapshot();
  });
});
