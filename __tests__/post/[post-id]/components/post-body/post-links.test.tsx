import { expect, describe, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import PostLinks from "@/post/[post-id]/components/post-body/post-links";

// Possible button labels
type Labels = "contents" | "versions" | "files";

// Mock useRouter to spy on replace
const routerReplaceMock = jest.fn().mockName("router.replace()");
jest.mock("next/navigation");
(useRouter as jest.Mock).mockReturnValue({ replace: routerReplaceMock });

// Tests are reused for each of the different buttons

const redirectsTest = async (label: Labels) => {
  // Tests if clicking the button redirects to correct page
  const postId = "6327282";

  render(<PostLinks postId={postId} />);
  const button = screen.getByText(label, { exact: false });

  const user = userEvent.setup();
  await user.click(button);

  expect(routerReplaceMock).toHaveBeenCalledWith(
    label === "contents" ? `/post/${postId}` : `/post/${postId}/${label}`,
  );
};

const disabledTest = (label: Labels) => {
  // Tests if button is disabled when in own view
  const postId = "62728";

  // Mock usePathname
  (usePathname as jest.Mock).mockReturnValue(
    label === "contents" ? `/post/${postId}` : `/post/${postId}/${label}`,
  );

  render(<PostLinks postId={postId} />);
  const button = screen.getByText(label, { exact: false });
  expect(button).toBeDisabled();
};

const testGroup = (label: Labels) => {
  // Returns test group for given label
  return () => {
    it("redirects", () => redirectsTest(label));
    it(`gets disabled in ${label}`, () => disabledTest(label));
  };
};

describe("Versions link", testGroup("versions"));
describe("Contents link", testGroup("contents"));
describe("Files link", testGroup("files"));
