// import { expect, describe, it } from "@jest/globals";
// import { render, screen, waitFor } from "@testing-library/react";
import fetchPostData from "@/lib/api/services/post-api";
// import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";
import { dummyPost } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/post-api");

// Mock useRouter so it exists when component is rendered
jest.mock("next/navigation");

describe("PostCardMini", () => {
  (fetchPostData as jest.Mock).mockResolvedValue(dummyPost);

  it("PLACEHOLDER TEST, REMOVE ME", () => {});

  // TODO
  // it("shows the post title after load", async () => {
  //   render(<PostCardMini id={dummyPost.id} />);

  //   // Wait for the data to load and skeleton to be gone
  //   await waitFor(() => {
  //     expect(screen.getByRole("heading")).toBeInTheDocument();
  //   });

  //   expect(screen.getByText(dummyPost.title)).toBeInTheDocument();
  //   expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
  // });
});
