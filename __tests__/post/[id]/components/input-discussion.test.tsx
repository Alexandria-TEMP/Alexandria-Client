const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { uploadDiscussion } from "@/lib/api-calls/discussion-api";
import InputDiscussion from "@/post/[id]/components/input-discussion";

jest.mock("@/lib/api-calls/discussion-api");

describe("InputDiscussion", () => {
  const versionId = "51235312";
  const mockedApi = uploadDiscussion as jest.Mock;
  mockedApi.mockResolvedValue({});

  it("renders a textbox", () => {
    render(<InputDiscussion versionId={versionId} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls uploadDiscussion with input", async () => {
    const user = userEvent.setup();
    const inputText = "Alexandria is pretty cool";

    render(<InputDiscussion versionId={versionId} />);

    await user.type(screen.getByRole("textbox"), inputText);
    await user.click(screen.getByRole("button"));

    expect(mockedApi).toHaveBeenCalledWith(inputText, versionId);
  });
});
