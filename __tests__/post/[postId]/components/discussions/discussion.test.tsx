import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { fetchDiscussionData } from "@/lib/api/services/discussion-api";
import Discussion from "@/post/[postId]/components/discussions/discussion";
import { dummyDiscussion } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/discussion-api");

describe("Discussion", () => {
  (fetchDiscussionData as jest.Mock).mockResolvedValue(dummyDiscussion);

  it("shows its author", async () => {
    // Written like this because Jest currently doesn't support async
    // server-side components. https://github.com/testing-library/react-testing-library/issues/1209
    render(await Discussion({ id: dummyDiscussion.id }));

    expect(
      screen.getByText(dummyDiscussion.author.firstName, { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows its creation date", async () => {
    render(await Discussion({ id: dummyDiscussion.id }));

    expect(
      screen.getByText(dummyDiscussion.createdAt, { exact: false }),
    ).toBeInTheDocument();
  });

  it("shows its contents", async () => {
    render(await Discussion({ id: dummyDiscussion.id }));

    expect(screen.getByText(dummyDiscussion.text)).toBeInTheDocument();
  });
});
