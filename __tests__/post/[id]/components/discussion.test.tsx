const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { getDiscussionData } from "@/post/[id]/lib/discussion-api";
import Discussion from "@/post/[id]/components/discussion";

jest.mock("@/post/[id]/lib/discussion-api");

describe("Discussion", () => {
  const dummyDiscussion = {
    id: "4321",
    anonymous: false,
    author: {
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      institution: "TU Delft",
      lastName: "Curie",
    },
    createdAt: "11 May 2024",
    deleted: false,
    deletedAt: "-",
    replies: [],
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut ducimus amet ex qui eius corrupti reiciendis, quibusdam suscipit, aspernatur ipsum. Reprehenderit libero molestias nostrum eum sed? Illo, quidem ad.",
    updatedAt: "11 May 2024",
  };

  (getDiscussionData as jest.Mock).mockResolvedValue(dummyDiscussion);

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
