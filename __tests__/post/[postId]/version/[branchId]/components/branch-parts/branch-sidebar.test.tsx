import BranchSidebar from "@/post/[postId]/(branch)/version/[branchId]/components/branch-parts/branch-sidebar";
import ChipList from "@/components/common/chip-list";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import {
  fetchBranchData,
  fetchBranchUpdatedFieldsFallback,
} from "@/lib/api/services/branch-api";
import {
  dummyBranches,
  dummyPostUnion,
  dummyScientificFields,
} from "~/__tests__/__utils__/dummys";
import {
  fetchBranchCollaboratorsMemberIDs,
  fetchPostCollaboratorsMemberIDs,
} from "@/lib/api/services/collaborator-api";
import { fetchScientificFieldsFromContainer } from "@/lib/api/services/fields-api";
import { fetchPostData } from "@/lib/api/services/post-api";

jest.mock("@/lib/api/services/collaborator-api");
jest.mock("@/lib/api/services/fields-api");
jest.mock("@/lib/api/services/branch-api");
jest.mock("@/components/common/chip-list");
jest.mock("@/post/[postId]/components/cards/author-card-list");
jest.mock("@/post/[postId]/components/cards/post-card-mini");
jest.mock("@/lib/api/services/post-api");

describe("BranchSidebarTest", () => {
  (fetchBranchUpdatedFieldsFallback as jest.Mock).mockResolvedValue(
    dummyBranches["accepted"].updated,
  );
  (fetchBranchCollaboratorsMemberIDs as jest.Mock).mockResolvedValue([1]);
  (fetchPostCollaboratorsMemberIDs as jest.Mock).mockResolvedValue([1]);
  (fetchScientificFieldsFromContainer as jest.Mock).mockResolvedValue(
    dummyScientificFields,
  );
  (fetchBranchData as jest.Mock).mockResolvedValue(dummyBranches["accepted"]);
  (fetchPostData as jest.Mock).mockResolvedValue(dummyPostUnion.withProject);
  (ChipList as jest.Mock).mockReturnValue(<p>ChipList</p>);
  (AuthorCardList as jest.Mock).mockReturnValue(<p>AuthorCardList</p>);
  (PostCardMini as jest.Mock).mockReturnValue(<p>PostCardMini</p>);

  it("matches snapshot", async () => {
    const { container } = render(
      await BranchSidebar({ id: 1, isClosed: true }),
    );
    expect(container).toMatchSnapshot();
  });
});
