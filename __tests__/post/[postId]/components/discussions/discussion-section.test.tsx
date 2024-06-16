import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import Discussion from "@/post/[postId]/components/discussions/discussion";
import InputDiscussion from "@/post/[postId]/components/discussions/input-discussion";
import DiscussionSection from "@/post/[postId]/components/discussions/discussion-section";
import { dummyVersion } from "~/__tests__/__utils__/dummys";
import { getVersionData } from "@/lib/api/services/version-api";

jest.mock("@/post/[postId]/components/discussions/discussion");
jest.mock("@/post/[postId]/components/discussions/input-discussion");
jest.mock("@/lib/api/services/version-api");

describe("DiscussionSection", () => {
  (Discussion as jest.Mock).mockReturnValue(<p>Discussion</p>);
  (InputDiscussion as jest.Mock).mockReturnValue(<input />);
  (getVersionData as jest.Mock).mockResolvedValue(dummyVersion);

  it("shows number of replies", async () => {
    // Written like this because Jest currently doesn't support async
    // server-side components. https://github.com/testing-library/react-testing-library/issues/1209
    render(await DiscussionSection({ versionId: dummyVersion.id }));
    const header = screen.getByText(`${dummyVersion.discussionIDs.length}`, {
      exact: false,
    });
    expect(header).toBeInTheDocument();
  });

  it("matches snapshot", async () => {
    const { container } = render(
      await DiscussionSection({ versionId: dummyVersion.id }),
    );

    expect(container).toMatchSnapshot();
  });
});
