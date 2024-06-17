import { expect, describe, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { uploadDiscussion } from "@/lib/api/services/discussion-api";
import InputDiscussion from "@/post/[postId]/components/discussions/input-discussion";

jest.mock("@/lib/api/services/discussion-api");

describe("InputDiscussion", () => {
  const discussionContainerID = 51235312;
  const mockedApi = uploadDiscussion as jest.Mock;
  mockedApi.mockResolvedValue({});

  it("renders a textbox", () => {
    render(<InputDiscussion id={discussionContainerID} />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("calls uploadDiscussion with input", async () => {
    const user = userEvent.setup();
    const inputText = "Alexandria is pretty cool";

    render(<InputDiscussion id={discussionContainerID} />);

    await user.type(screen.getByRole("textbox"), inputText);
    await user.click(screen.getByRole("button"));

    expect(mockedApi).toHaveBeenCalledWith(inputText, discussionContainerID);
  });
});
