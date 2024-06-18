import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import Discussion from "@/post/[postId]/components/discussions/discussion";
import { dummyDiscussion, dummyMembers } from "~/__tests__/__utils__/dummys";
import { useDiscussionAndAuthorData } from "@/lib/api/hooks/discussion-hooks";

jest.mock("@/lib/api/hooks/discussion-hooks");

describe("Discussion", () => {
  (useDiscussionAndAuthorData as jest.Mock).mockReturnValue({
    data: { discussion: dummyDiscussion, author: dummyMembers[0] },
    isLoading: false,
  });

  it("matches snapshot", () => {
    const { container } = render(<Discussion id={dummyDiscussion.id} />);
    expect(container).toMatchSnapshot();
  });
});
