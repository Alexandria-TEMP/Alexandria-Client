import { getMergeRequestData } from "@/lib/api-calls/merge-request-api";
import MergeRequestList from "@/post/[postId]/(main-post-view)/version-list/components/merge-request-list";
import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import { dummyMergeRequests } from "~/__tests__/__utils__/dummys";
import MergeRequestCard from "@/post/[postId]/(main-post-view)/version-list/components/merge-request-card";

jest.mock("@/lib/api-calls/merge-request-api");
jest.mock("@/post/[postId]/(main-post-view)/version-list/components/merge-request-card");

describe("MergeRequestList", () => {
  (getMergeRequestData as jest.Mock).mockResolvedValue(
    dummyMergeRequests["open"],
  );
  (MergeRequestCard as jest.Mock).mockReturnValue(<p>Card</p>)
  
  it("matches snapshot", () => {
    const { container } = render(
      <MergeRequestList postId={1} ids={["0","1","2","3","4"]} />
    );
    expect(container).toMatchSnapshot();
  });

  it("grid matches snapshot", () => {
    const { container } = render(
      <MergeRequestList grid postId={1} ids={["0","1","2","3","4"]} />
    );
    expect(container).toMatchSnapshot();
  });
});