import PeerReviewInput from "@/post/[postId]/(branch)/version/[branchId]/components/peer-review/peer-review-input";
import { expect, describe, it } from "@jest/globals";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import createMockRouter from "~/__tests__/__utils__/create-mock-router";

jest.mock("next/navigation");

describe("PeerReviewInput", () => {
  (useRouter as jest.Mock).mockReturnValue(createMockRouter());

  it("matches snapshot", () => {
    const { container } = render(<PeerReviewInput branchID={1} postID={1} />);
    expect(container).toMatchSnapshot();
  });

  it("displays error on empty text", async () => {
    render(<PeerReviewInput branchID={1} postID={1} />);
    await userEvent.click(screen.getByTestId("review-submit"));
    await waitFor(() => {
      expect(
        screen.getByText("You cannot submit an empty review."),
      ).toBeInTheDocument();
      expect(
        screen.getByText("You must select if you approve or not."),
      ).toBeInTheDocument();
    });
  });
});
