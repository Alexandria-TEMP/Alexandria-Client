import PostCardHeader from "@/post/[postId]/components/post-parts/post-card-header";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { fetchPostData } from "@/lib/api/services/post-api";
import { dummyPost, dummyPostUnion } from "~/__tests__/__utils__/dummys";
import { Card } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";
import { cookies } from "next/headers";
import { fetchBranchesCanReview } from "@/lib/api/services/branch-api";

// Mock getPostData()
jest.mock("@/lib/api/services/post-api");
// Mock useRouter so it's mounted
jest.mock("next/navigation");
// Mock cookies so the user appears logged in
jest.mock("next/headers");
// Mock fetcher so it returns dummy value
jest.mock("@/lib/api/services/branch-api");

describe("PostCardHeader", () => {
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());
  (fetchPostData as jest.Mock).mockResolvedValue(dummyPostUnion.withProject);
  (cookies as jest.Mock).mockReturnValue({ get: (name: string) => "token" });
  (fetchBranchesCanReview as jest.Mock).mockResolvedValue(true);

  it("renders title", async () => {
    render(
      <Card>
        {await PostCardHeader({
          id: dummyPostUnion.withProject.projectPost?.id,
          isProject: true,
        })}
      </Card>,
    );

    const title = screen.getByText(dummyPost.title);
    expect(title).toBeInTheDocument();
  });

  it("renders metadata", async () => {
    render(
      <Card>
        {await PostCardHeader({
          id: dummyPostUnion.withProject.projectPost?.id,
          isProject: true,
        })}
      </Card>,
    );

    expect(
      screen.getByText(dummyPostUnion.withProject.post.postType, {
        exact: false,
      }),
    ).toBeInTheDocument();
    // TODO
    // expect(screen.getByText(dummyPost.status)).toBeInTheDocument();
    // expect(
    //   screen.getByText(dummyPost.createdAt, {
    //     exact: false,
    //   }),
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByText(dummyPost.updatedAt, {
    //     exact: false,
    //   }),
    // ).toBeInTheDocument();
  });

  it("hides contribute button", async () => {
    render(
      <Card>
        {await PostCardHeader({
          id: dummyPostUnion.withProject.projectPost?.id,
          isProject: true,
          hideContribute: true,
        })}
      </Card>,
    );

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).not.toBeInTheDocument();
  });

  it("shows contribute button", async () => {
    render(
      <Card>
        {await PostCardHeader({
          id: dummyPostUnion.withProject.projectPost?.id,
          isProject: true,
          hideContribute: false,
        })}
      </Card>,
    );

    expect(
      screen.queryByRole("button", { name: "Contribute" }),
    ).toBeInTheDocument();
  });
});
