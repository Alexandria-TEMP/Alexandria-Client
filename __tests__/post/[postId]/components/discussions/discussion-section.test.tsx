import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Discussion from "@/post/[postId]/components/discussions/discussion";
import InputDiscussion from "@/post/[postId]/components/discussions/input-discussion";
import DiscussionSection from "@/post/[postId]/components/discussions/discussion-section";
import { dummyDiscussionContainer } from "~/__tests__/__utils__/dummys";
import { fetchDiscussionContainer } from "@/lib/api/services/discussion-api";

jest.mock("@/post/[postId]/components/discussions/discussion");
jest.mock("@/post/[postId]/components/discussions/input-discussion");
jest.mock("@/lib/api/services/discussion-api");

describe("DiscussionSection", () => {
  (Discussion as jest.Mock).mockReturnValue(<p>Discussion</p>);
  (InputDiscussion as jest.Mock).mockReturnValue(<input />);
  (fetchDiscussionContainer as jest.Mock).mockResolvedValue(
    dummyDiscussionContainer,
  );

  it("shows number of replies", async () => {
    // Written like this because Jest currently doesn't support async
    // server-side components. https://github.com/testing-library/react-testing-library/issues/1209
    render(await DiscussionSection({ id: dummyDiscussionContainer.id }));
    const header = screen.getByText(
      `${dummyDiscussionContainer.discussionIDs.length}`,
      {
        exact: false,
      },
    );
    expect(header).toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      await DiscussionSection({ id: dummyDiscussionContainer.id }),
    );

    expect(container).toMatchSnapshot();
  });
});
