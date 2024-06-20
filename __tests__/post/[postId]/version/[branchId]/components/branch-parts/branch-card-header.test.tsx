import { useBranchData } from "@/lib/api/hooks/branch-hooks";
import BranchCardHeader from "@/post/[postId]/(branch)/version/[branchId]/components/branch-parts/branch-card-header";
import { expect, describe, it } from "@jest/globals";
import { Card } from "@nextui-org/react";
import { render, screen, waitFor } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";
import { dummyBranches } from "~/__tests__/__utils__/dummys";

// Mock useBranchData()
jest.mock("@/lib/api/hooks/branch-hooks");
// Mock useRouter so it's mounted
jest.mock("next/navigation");

describe("BranchCardHeader", () => {
  (usePathname as jest.Mock).mockReturnValue("");
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());

  const generateSnapshotTestForStatus = (
    status: "accepted" | "rejected" | "open",
  ) => {
    return async () => {
      (useBranchData as jest.Mock).mockReturnValue({
        isLoading: false,
        data: dummyBranches[status],
      });
      const { container } = render(
        <Card>
          <BranchCardHeader
            id={1}
            isClosed={status != "open"}
            postPathID="somepath"
            actions={[
              { label: "Contents", do: () => jest.fn(), isDisabled: true },
              { label: "Files", do: () => jest.fn(), isDisabled: false },
            ]}
          />
        </Card>,
      );
      await waitFor(() => {
        const title = screen.getByRole("heading", {
          name: dummyBranches[status].branch.branchTitle,
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
