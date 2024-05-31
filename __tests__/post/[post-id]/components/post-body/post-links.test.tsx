import { expect, describe, it } from "@jest/globals";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import { useRouter, usePathname } from "next/navigation";
import LinkGroup from "@/post/[postId]/components/post-body/link-group";

// Possible button labels
type Labels = "contents" | "version-list" | "files";

// Mock useRouter to spy on replace
const routerReplaceMock = jest.fn().mockName("router.replace()");
jest.mock("next/navigation");
(useRouter as jest.Mock).mockReturnValue({ replace: routerReplaceMock });

// Tests are reused for each of the different buttons

const postId = "6327282";
const links = [
  { label: "Contents", href: `/post/${postId}` },
  { label: "Versions", href: `/post/${postId}/version-list` },
  { label: "Files", href: `/post/${postId}/files` },
];

const redirectsTest = async (label: Labels, text?: string) => {
  // Tests if clicking the button redirects to correct page

  render(<LinkGroup links={links} />);
  const button = screen.getByText(text ?? label, { exact: false });

  const user = userEvent.setup();
  await user.click(button);

  expect(routerReplaceMock).toHaveBeenCalledWith(
    label === "contents" ? `/post/${postId}` : `/post/${postId}/${label}`,
  );
};

const disabledTest = (label: Labels, text?: string) => {
  // Tests if button is disabled when in own view
  const postId = "62728";

  // Mock usePathname
  (usePathname as jest.Mock).mockReturnValue(
    label === "contents" ? `/post/${postId}` : `/post/${postId}/${label}`,
  );

  render(<LinkGroup links={links} />);
  const button = screen.getByText(text ?? label, { exact: false });
  expect(button).toBeDisabled();
};

const testGroup = (label: Labels) => {
  // Returns test group for given label
  return () => {
    it("redirects", () =>
      redirectsTest(label, label === "version-list" ? "versions" : label));
    it(`gets disabled in ${label}`, () =>
      disabledTest(label, label === "version-list" ? "versions" : label));
  };
};

describe("Versions link", testGroup("version-list"));
describe("Contents link", testGroup("contents"));
describe("Files link", testGroup("files"));
