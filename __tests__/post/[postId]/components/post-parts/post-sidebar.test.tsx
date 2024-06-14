import fetchPostData from "@/lib/api-calls/post-api";
import PostSidebar from "@/post/[postId]/components/post-parts/post-sidebar";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { dummyPost } from "~/__tests__/__utils__/dummys";
import AuthorCardList from "@/post/[postId]/components/cards/author-card-list";

jest.mock("@/lib/api-calls/post-api");
jest.mock("@/post/[postId]/components/cards/author-card-list");

describe("PostSidebar", () => {
  (fetchPostData as jest.Mock).mockResolvedValue(dummyPost);
  (AuthorCardList as jest.Mock).mockReturnValue(<p>List of members</p>);

  it("matches snapshot", async () => {
    const { container } = render(await PostSidebar({ postId: "1" }));
    expect(container).toMatchSnapshot();
  });
});
