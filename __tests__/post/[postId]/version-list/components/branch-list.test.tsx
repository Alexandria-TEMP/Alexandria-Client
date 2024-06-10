import { getBranchData } from "@/lib/api-calls/branch-api";
import BranchList from "@/post/[postId]/(main-post-view)/version-list/components/branch-list";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { dummyBranches } from "~/__tests__/__utils__/dummys";
import BranchCard from "@/post/[postId]/(main-post-view)/version-list/components/branch-card";

jest.mock("@/lib/api-calls/branch-api");
jest.mock(
  "@/post/[postId]/(main-post-view)/version-list/components/branch-card",
);

describe("BranchList", () => {
  (getBranchData as jest.Mock).mockResolvedValue(dummyBranches["open"]);
  (BranchCard as jest.Mock).mockReturnValue(<p>Card</p>);

  it("matches snapshot", () => {
    const { container } = render(
      <BranchList postId={1} ids={["0", "1", "2", "3", "4"]} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("grid matches snapshot", () => {
    const { container } = render(
      <BranchList grid postId={1} ids={["0", "1", "2", "3", "4"]} />,
    );
    expect(container).toMatchSnapshot();
  });
});
