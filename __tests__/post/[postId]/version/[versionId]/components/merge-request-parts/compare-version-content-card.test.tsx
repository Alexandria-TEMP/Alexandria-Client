import { getBranchData } from "@/lib/api-calls/merge-request-api";
import CompareVersionContentCard from "@/post/[postId]/(version-view)/version/[versionId]/components/merge-request-parts/compare-version-content-card";
import VersionRender from "@/post/[postId]/components/version-render/component";
import { expect, describe, it } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";
import { dummyBranches } from "~/__tests__/__utils__/dummys";

// Mock getMergeRequestData()
jest.mock("@/lib/api-calls/merge-request-api");
// Mock useRouter so it's mounted
jest.mock("next/navigation");
// Mock version render to reduce coupling
jest.mock("@/post/[postId]/components/version-render/component");

describe("CompareVersionContentCard", () => {
  (usePathname as jest.Mock).mockReturnValue("");
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());
  (getBranchData as jest.Mock).mockResolvedValue(dummyBranches["accepted"]);

  beforeEach(async () => {
    (VersionRender as jest.Mock).mockImplementation(({ id }) =>
      id === "1" ? (
        <p data-testid="new-version">This is the new version</p>
      ) : (
        <p data-testid="old-version">This version is being replaced</p>
      ),
    );

    render(
      <CompareVersionContentCard
        newVersionId={1}
        previousVersionId={2}
        postId={0}
        mergeRequestId={0}
      />,
    );

    await waitFor(() => {
      const title = screen.getByRole("heading", {
        name: dummyBranches["accepted"].newPostTitle,
      });
      expect(title).toBeInTheDocument();
    });
  });

  it("shows one version when compare is off", () => {
    const newVersion = screen.getByTestId("new-version");
    const oldVersion = screen.getByTestId("old-version");

    expect(newVersion).toBeInTheDocument();
    expect(oldVersion).toBeInTheDocument();
  });

  it("shows both versions when compare is on", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("switch", { name: "Compare" }));

    await waitFor(() => {
      const newVersion = screen.getByTestId("new-version");
      const oldVersion = screen.getByTestId("old-version");

      expect(newVersion).toBeInTheDocument();
      expect(oldVersion).toBeInTheDocument();
    });
  });
});
