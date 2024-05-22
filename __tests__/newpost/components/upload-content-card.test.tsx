import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UploadContentCard from "@/newpost/components/upload-content-card";

describe("Upload content", () => {
  it("renders correct elements", () => {
    render(<UploadContentCard />);

    const titleElem = screen.getByText("Upload Content");
    const fileCard = screen.getByTestId("upload-files-test-id");
    const githubCard = screen.getByTestId("import-github-test-id");

    expect(titleElem).toBeInTheDocument();
    expect(fileCard).toBeInTheDocument();
    expect(githubCard).toBeInTheDocument();
  });
});
