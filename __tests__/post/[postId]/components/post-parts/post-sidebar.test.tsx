import fetchPostData from "@/lib/api/services/post-api";
import PostSidebar from "@/post/[postId]/components/post-parts/post-sidebar";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import {
  dummyPostUnion,
  dummyScientificField,
} from "~/__tests__/__utils__/dummys";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";
import { fetchScientificFieldsFromContainer } from "@/lib/api/services/fields-api";
import { fetchPostCollaboratorsAsSortedMemberIDs } from "@/lib/api/services/collaborator-api";

jest.mock("@/lib/api/services/post-api");
jest.mock("@/lib/api/services/fields-api");
jest.mock("@/lib/api/services/collaborator-api");
jest.mock("@/post/[postId]/components/cards/author-card-list");

describe("PostSidebar", () => {
  (fetchPostData as jest.Mock).mockResolvedValue(dummyPostUnion.withProject);
  (fetchPostCollaboratorsAsSortedMemberIDs as jest.Mock).mockResolvedValue({
    author: [1],
    contributor: [1],
    reviewer: [1],
  });
  (fetchScientificFieldsFromContainer as jest.Mock).mockResolvedValue([
    dummyScientificField,
    dummyScientificField,
    dummyScientificField,
  ]);
  (AuthorCardList as jest.Mock).mockReturnValue(<p>List of members</p>);

  it("matches snapshot", async () => {
    const { container } = render(await PostSidebar({ id: 1, isProject: true }));
    expect(container).toMatchSnapshot();
  });
});
