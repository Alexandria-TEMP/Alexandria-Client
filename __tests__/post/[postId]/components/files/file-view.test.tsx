import { useFileContents } from "@/lib/api-calls/quarto-api";
import FileView from "@/post/[postId]/components/files/file-view";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";

jest.mock("@/lib/api-calls/quarto-api");

describe("FileView", () => {
  it("shows loading screen while loading", () => {
    (useFileContents as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });
    render(<FileView id="1" container="branch" path="some/path.tsx" />);

    expect(screen.getByTestId("default-loading")).toBeVisible();
  });

  it("shows error screen when error happens", () => {
    (useFileContents as jest.Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: new Error("test error"),
    });
    render(<FileView id="1" container="branch" path="some/path.tsx" />);

    expect(screen.getByTestId("default-error")).toBeVisible();
  });

  it("shows file contents", () => {
    const data =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor, leo eu blandit sodales, mauris elit vehicula tortor, interdum sagittis nisl nisl vel arcu. Morbi id molestie dui.";
    (useFileContents as jest.Mock).mockReturnValue({
      data,
      isLoading: false,
      error: undefined,
    });
    render(<FileView id="1" container="branch" path="some/path.tsx" />);

    expect(screen.getByText(data)).toBeVisible();
  });
});
