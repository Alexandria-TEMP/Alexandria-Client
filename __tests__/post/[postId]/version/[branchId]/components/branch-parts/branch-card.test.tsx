import { useBranchData } from "@/lib/api/hooks/branch-hooks";
import { idT } from "@/lib/types/api-types";
import BranchCard from "@/post/[postId]/(branch)/version/[branchId]/components/branch-parts/branch-card";
import FileTree from "@/post/[postId]/components/files/file-tree";
import RenderedQuarto from "@/post/[postId]/components/render/rendered-quarto";
import { expect, describe, it } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";
import { dummyBranches } from "~/__tests__/__utils__/dummys";

// Mock useBranchData()
jest.mock("@/lib/api/hooks/branch-hooks");
// Mock useRouter so it's mounted
jest.mock("next/navigation");
// Mock render and file tree to reduce coupling
jest.mock("@/post/[postId]/components/render/rendered-quarto");
jest.mock("@/post/[postId]/components/files/file-tree");

describe("BranchCard", () => {
  (usePathname as jest.Mock).mockReturnValue("");
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());
  (useBranchData as jest.Mock).mockReturnValue({
    data: dummyBranches["accepted"],
    isLoading: false,
  });

  beforeEach(async () => {
    (RenderedQuarto as jest.Mock).mockImplementation(({ id }) =>
      id === 1 ? (
        <p data-testid="old-version">This version is being replaced</p>
      ) : (
        <p data-testid="new-version">This is the new version</p>
      ),
    );

    (FileTree as jest.Mock).mockImplementation(({ id }) =>
      id === 1 ? (
        <p data-testid="old-files">These files are being replaced</p>
      ) : (
        <p data-testid="new-files">These are the new files</p>
      ),
    );

    render(
      <BranchCard
        id={dummyBranches["accepted"].id.id as idT}
        isClosed={dummyBranches["accepted"].id.isClosed}
      />,
    );

    await waitFor(() => {
      const title = screen.getByRole("heading", {
        name: dummyBranches["accepted"].branch.branchTitle,
      });
      expect(title).toBeInTheDocument();
    });
  });

  const getElements = (view: "files" | "versions") => {
    const compareSwitch = screen.getByRole("switch", { name: "Compare" });
    if (view === "versions") {
      const newVersion = screen.getByTestId("new-version");
      const oldVersion = screen.getByTestId("old-version");
      return { compareSwitch, newVersion, oldVersion };
    } else {
      const newFiles = screen.getByTestId("new-files");
      const oldFiles = screen.getByTestId("old-files");
      return { compareSwitch, newFiles, oldFiles };
    }
  };

  it("shows one version when compare is off", () => {
    const { compareSwitch, newVersion, oldVersion } = getElements("versions");

    expect(compareSwitch).not.toBeChecked();
    expect(newVersion).toBeVisible();
    expect(oldVersion?.parentElement).toHaveClass("hidden");
  });

  it("shows both versions when compare is on", async () => {
    const { compareSwitch, newVersion, oldVersion } = getElements("versions");

    const user = userEvent.setup();
    await user.click(compareSwitch);

    await waitFor(() => {
      expect(compareSwitch).toBeChecked();

      expect(newVersion).toBeVisible();
      expect(oldVersion).toBeVisible();
      expect(oldVersion?.parentElement).not.toHaveClass("hidden");
    });
  });

  it("shows file tree after button is pressed", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Files" }));

    const { newFiles } = getElements("files");
    expect(newFiles).toBeVisible();
  });

  it("shows both file tree if user pressed compare then button", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("switch", { name: "Compare" }));
    await user.click(screen.getByRole("button", { name: "Files" }));

    await waitFor(() => {
      const { compareSwitch, newFiles, oldFiles } = getElements("files");

      expect(compareSwitch).toBeChecked();
      expect(newFiles).toBeVisible();
      expect(oldFiles).toBeVisible();
      expect(oldFiles?.parentElement).not.toHaveClass("hidden");
    });
  });

  it("shows both file tree if user pressed button then compare", async () => {
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Files" }));
    await user.click(screen.getByRole("switch", { name: "Compare" }));

    await waitFor(() => {
      const { compareSwitch, newFiles, oldFiles } = getElements("files");

      expect(compareSwitch).toBeChecked();
      expect(newFiles).toBeVisible();
      expect(oldFiles).toBeVisible();
      expect(oldFiles?.parentElement).not.toHaveClass("hidden");
    });
  });
});
