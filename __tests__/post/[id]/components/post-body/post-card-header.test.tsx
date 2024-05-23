import PostCardHeader from "@/post/[id]/components/post-body/post-card-header";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import getPostData from "@/lib/api-calls/post-api";
import { dummyPost } from "~/__tests__/__utils__/dummys";

// Mock getPostData()
jest.mock("@/lib/api-calls/post-api");

describe("PostCardHeader", () => {
  (getPostData as jest.Mock).mockResolvedValue(dummyPost);

  it("renders title", () => {
    render(PostCardHeader({ postId: dummyPost.id }));

    const title = screen.getByText(dummyPost.title);
    expect(title).toBeInTheDocument();
  });

  it("renders metadata", () => {
    render(PostCardHeader({ postId: dummyPost.id }));

    expect(screen.getByText(dummyPost.postType)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.createdAt)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.updatedAt)).toBeInTheDocument();
  });

  it("hides contribute button", () => {
    render(PostCardHeader({ postId: dummyPost.id, hideContribute: true }));

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).not.toBeInTheDocument();
  });

  it("shows contribute button", () => {
    render(PostCardHeader({ postId: dummyPost.id, hideContribute: false }));

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).toBeInTheDocument();
  });
});
