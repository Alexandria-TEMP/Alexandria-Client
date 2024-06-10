import { getBranchData } from "@/lib/api-calls/merge-request-api";
import MergeRequestCardHeader from "@/post/[postId]/(version-view)/version/[versionId]/components/merge-request-parts/merge-request-card-header";
import { expect, describe, it } from "@jest/globals";
import { Card } from "@nextui-org/react";
import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";
import { dummyBranches } from "~/__tests__/__utils__/dummys";

// Mock getMergeRequestData()
jest.mock("@/lib/api-calls/merge-request-api");
// Mock useRouter so it's mounted
jest.mock("next/navigation");

describe("MergeRequestCardHeaderTest", () => {
  (usePathname as jest.Mock).mockReturnValue("");
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());

  const generateSnapshotTestForStatus = (
    status: "accepted" | "rejected" | "open",
  ) => {
    return async () => {
      (getBranchData as jest.Mock).mockResolvedValue(dummyBranches[status]);
      const { container } = render(
        <Card>
          <MergeRequestCardHeader postId={0} mergeRequestId={0} />
        </Card>,
      );
      await waitFor(() => {
        const title = screen.getByRole("heading", {
          name: dummyBranches[status].newPostTitle,
        });
        expect(title).toBeInTheDocument();
      });
      expect(container).toMatchSnapshot();
    };
  };

  it(
    "matches snapshot when status is accepted",
    generateSnapshotTestForStatus("accepted"),
  );
  it(
    "matches snapshot when status is rejected",
    generateSnapshotTestForStatus("rejected"),
  );
  it(
    "matches snapshot when status is open",
    generateSnapshotTestForStatus("open"),
  );
});
