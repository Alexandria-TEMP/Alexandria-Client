import { expect, describe, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import InputDiscussion from "@/post/[postId]/components/discussions/input-discussion";
import { useRouter } from "next/navigation";
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { PrefetchOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  replyDiscussionSubmitHandler,
  rootDiscussionSubmitHandler,
} from "@/post/[postId]/lib/submit-discussion";

jest.mock("@/post/[postId]/lib/submit-discussion");
jest.mock("next/navigation");

(useRouter as jest.Mock).mockReturnValue({
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  push: jest.fn((href: string, options?: NavigateOptions) => {}),
  replace: jest.fn((href: string, options?: NavigateOptions) => {}),
  prefetch: jest.fn((href: string, options?: PrefetchOptions) => {}),
});

describe("InputDiscussion", () => {
  const discussionContainerID = 51235312;
  (rootDiscussionSubmitHandler as jest.Mock).mockImplementation(() => {});
  (replyDiscussionSubmitHandler as jest.Mock).mockImplementation(() => {});

  it("matches snapshot normal", () => {
    const { container } = render(
      <InputDiscussion id={discussionContainerID} isRoot />,
    );
    expect(container).toMatchSnapshot();
  });

  // it("matches snapshot reply", () => {
  //   const { container } = render(
  //     <InputDiscussion id={discussionContainerID} isRoot={false} />,
  //   );
  //   expect(container).toMatchSnapshot();
  // });

  it("calls uploadRootDiscussion", async () => {
    const user = userEvent.setup();
    const inputText = "Alexandria is pretty cool";

    render(<InputDiscussion id={discussionContainerID} isRoot />);

    await user.type(screen.getByRole("textbox"), inputText);
    await user.click(screen.getByRole("button"));

    expect(rootDiscussionSubmitHandler).toHaveBeenCalled();
  });

  it("calls uploadReplyDiscussion", async () => {
    const user = userEvent.setup();
    const inputText = "Alexandria is pretty cool";

    render(<InputDiscussion id={discussionContainerID} isRoot={false} />);

    await user.type(screen.getByRole("textbox"), inputText);
    await user.click(screen.getByRole("button"));

    expect(replyDiscussionSubmitHandler).toHaveBeenCalled();
  });

  it("displays error messages on empty", async () => {
    render(<InputDiscussion id={discussionContainerID} />);
    await userEvent.click(screen.getByTestId("submit-discussion"));
    await waitFor(() => {
      expect(screen.getByText("You cannot submit an empty discussion."));
    });
  });
});
