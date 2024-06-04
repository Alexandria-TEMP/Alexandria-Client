import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import UploadContentCard from "@/components/form/upload-content-card";

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
