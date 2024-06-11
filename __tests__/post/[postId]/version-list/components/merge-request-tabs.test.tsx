import MergeRequestTabs from "@/post/[postId]/(main-post-view)/version-list/components/merge-request-tabs";
import { expect, describe, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("MergeRequestTabs", () => {
  it("switches between tabs", async () => {
    const user = userEvent.setup();

    const renderedViews = ["First view", "Second view", "Third view"];

    render(
      <MergeRequestTabs
        historyList={<p>{renderedViews[0]}</p>}
        openList={<p>{renderedViews[1]}</p>}
        rejectedList={<p>{renderedViews[2]}</p>}
      />,
    );

    expect(screen.getByText(renderedViews[0])).toBeInTheDocument();

    await user.click(screen.getByText("Proposed changes"));
    expect(screen.getByText(renderedViews[1])).toBeInTheDocument();

    await user.click(screen.getByText("Rejected changes"));
    expect(screen.getByText(renderedViews[2])).toBeInTheDocument();
  });
});