import PostCardHeader from "@/post/[id]/components/post-body/post-card-header";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import getPostData from "@/lib/api-calls/post-api";
import { dummyPost } from "~/__tests__/__utils__/dummys";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";

// Mock getPostData()
jest.mock("@/lib/api-calls/post-api");
// Mock useRouter so it's mounted
jest.mock("next/navigation");

describe("PostCardHeader", () => {
  (useRouter as jest.Mock).mockReturnValue(jest.fn());
  (getPostData as jest.Mock).mockResolvedValue(dummyPost);

  it("renders title", async () => {
    render(<Card>{await PostCardHeader({ postId: dummyPost.id })}</Card>);

    const title = screen.getByText(dummyPost.title);
    expect(title).toBeInTheDocument();
  });

  it("renders metadata", async () => {
    render(<Card>{await PostCardHeader({ postId: dummyPost.id })}</Card>);

    expect(screen.getByText(dummyPost.postType)).toBeInTheDocument();
    expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
    expect(
      screen.getByText(dummyPost.createdAt, { exact: false }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(dummyPost.updatedAt, { exact: false }),
    ).toBeInTheDocument();
  });

  it("hides contribute button", async () => {
    render(
      <Card>
        {await PostCardHeader({ postId: dummyPost.id, hideContribute: true })}
      </Card>,
    );

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).not.toBeInTheDocument();
  });

  it("shows contribute button", async () => {
    render(
      <Card>
        {await PostCardHeader({ postId: dummyPost.id, hideContribute: false })}
      </Card>,
    );

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).toBeInTheDocument();
  });
});
