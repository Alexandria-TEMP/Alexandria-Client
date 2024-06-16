import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { useFileTree } from "@/lib/api/hooks/version-hooks";
import FileView from "@/post/[postId]/components/files/file-view";
import FileTree from "@/post/[postId]/components/files/file-tree";
import userEvent from "@testing-library/user-event";

jest.mock("@/lib/api/hooks/version-hooks");
jest.mock("@/post/[postId]/components/files/file-view");

describe("FileTree", () => {
  (FileView as jest.Mock).mockReturnValue(
    <div data-testid="contents">File contents</div>,
  );

  const setup = () => {
    (useFileTree as jest.Mock).mockReturnValue({
      data: { "file.txt": 10, a: { b: { "c.md": 5 }, "nested_file.js": 2 } },
      isLoading: false,
      error: false,
    });
    render(<FileTree id="1" />);
    return userEvent.setup();
  };

  it("shows error screen when error happens", () => {
    (useFileTree as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("test error"),
    });
    render(<FileTree id="1" />);
    expect(screen.getByTestId("default-error")).toBeVisible();
  });

  it("shows file contents when file is clicked", async () => {
    const user = setup();
    await user.click(screen.getByRole("row", { name: "file.txt" }));
    expect(screen.getByTestId("contents")).toBeInTheDocument();
  });

  it("shows folder contents when folder is clicked", async () => {
    const user = setup();
    await user.click(screen.getByRole("row", { name: "a" }));

    expect(screen.getByRole("row", { name: "b" })).toBeInTheDocument();
    expect(
      screen.getByRole("row", { name: "nested_file.js" }),
    ).toBeInTheDocument();
  });

  it("updates breadcrumbs on navigation", async () => {
    const user = setup();

    // Breadcrumbs are "Root"
    expect(screen.queryByRole("link", { name: "a" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "b" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("row", { name: "a" }));

    // Breadcrumbs are "Root > a"
    expect(screen.getByRole("link", { name: "a" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "b" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("row", { name: "b" }));

    // Breadcrumbs are "Root > a > b"
    expect(screen.getByRole("link", { name: "a" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "b" })).toBeInTheDocument();
  });

  it("allows navigation through breadcrumbs", async () => {
    const user = setup();

    await user.click(screen.getByRole("row", { name: "a" }));
    await user.click(screen.getByRole("row", { name: "b" }));
    // Should be inside "a/b"
    expect(screen.getByRole("row", { name: "c.md" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "a" }));
    // Should be inside "a"
    expect(screen.getByRole("row", { name: "b" })).toBeInTheDocument();

    // Go back to "a/b" so we can try skipping a level
    await user.click(screen.getByRole("row", { name: "b" }));

    // Should be inside "a/b"
    expect(screen.getByRole("row", { name: "c.md" })).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Root" }));
    // Should be in root
    expect(screen.getByRole("row", { name: "a" })).toBeInTheDocument();
  });
});
