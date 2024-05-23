import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import getPostData from "@/lib/api-calls/post-api";
import PostCardMini from "@/post/[id]/components/post-card-mini";

jest.mock("@/lib/api-calls/post-api");

// Mock useRouter so it exists when component is rendered
jest.mock("next/navigation");

describe("PostCardMini", () => {
  const dummyPost = {
    title: "Post title",
    status: "Open for review",
    collaborators: ["1", "2"],
    createdAt: "10 May 2024",
    currentVersion: {
      id: "1",
      discussions: ["1", "1", "1", "1"],
    },
    id: "43125",
    postType: "Reflection",
    scientificFieldTags: [
      "Computer Science",
      "Mathematics",
      "Theory of computation",
    ],
    updatedAt: "11 May 2024",
  };

  (getPostData as jest.Mock).mockResolvedValue(dummyPost);

  it("shows the post title after load", async () => {
    render(<PostCardMini postId={dummyPost.id} />);

    // Wait for the data to load and skeleton to be gone
    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    expect(screen.getByText(dummyPost.title)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
  });
});
