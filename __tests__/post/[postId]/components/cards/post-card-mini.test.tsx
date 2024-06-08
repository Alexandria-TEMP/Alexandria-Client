import { expect, describe, it } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import getPostData from "@/lib/api-calls/post-api";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";
import { dummyPost } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api-calls/post-api");

// Mock useRouter so it exists when component is rendered
jest.mock("next/navigation");

describe("PostCardMini", () => {
  (getPostData as jest.Mock).mockResolvedValue(dummyPost);

  it("shows the post title after load", async () => {
    render(<PostCardMini id={dummyPost.id} />);

    // Wait for the data to load and skeleton to be gone
    await waitFor(() => {
      expect(screen.getByRole("heading")).toBeInTheDocument();
    });

    expect(screen.getByText(dummyPost.title)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
  });
});
