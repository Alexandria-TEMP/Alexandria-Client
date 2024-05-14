const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import getPostData from "@/post/[id]/lib/post-api";
import PostCardMini from "@/post/[id]/components/post-card-mini";

jest.mock("@/post/[id]/lib/post-api");

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

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
