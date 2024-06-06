import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupPage from "@/signup/page";

// mock the router since it depends on the context
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
      refresh: () => null,
    };
  },
}));

// Tests are reused across groups, so they're defined outside
const rendersFiledAndTitle = (text: string, testId: string) => () => {
  const nameHeaderElem = screen.getByText(text);
  const nameInputElem = screen.getByTestId(testId);

  expect(nameHeaderElem).toBeInTheDocument();
  expect(nameInputElem).toBeInTheDocument();
};

const showsIsRequiredError = (text: string, testId: string) => async () => {
  const user = userEvent.setup();
  const nameHeaderElem = screen.getByText(text);
  const nameInputElem = screen.getByTestId(testId);

  await user.type(nameInputElem, "test");
  await user.clear(nameInputElem);
  await user.click(nameHeaderElem); // click away for error to appear

  await waitFor(() => {
    expect(
      screen.getByText("Please enter your", { exact: false }),
    ).toBeInTheDocument();
  });
};

const showsMaxLengthError = (text: string, testId: string) => async () => {
  const user = userEvent.setup();
  const nameHeaderElem = screen.getByText(text);
  const nameInputElem = screen.getByTestId(testId);

  await user.click(nameInputElem);
  await user.paste("a".repeat(151));
  await user.click(nameHeaderElem); // click away for error to appear

  await waitFor(() => {
    expect(
      screen.getByText("character restriction", { exact: false }),
    ).toBeInTheDocument();
  });
};

describe("Personal data fields test", () => {
  beforeEach(() => {
    // TODO i cannot figure out how to mock the control and form state object
    // so i cannot individually render the personal data card component
    // so i am testing it by rendering the entire page, so that it has a proper useForm hook
    // const { rerender } = render(<SignupPage />);
    render(<SignupPage />);
  });

  describe("First name tests", () => {
    const text = "First Name";
    const testId = "first-name";

    it("renders field and title", rendersFiledAndTitle(text, testId));
    it("shows is required error", showsIsRequiredError(text, testId));
    it("shows max length error", showsMaxLengthError(text, testId));
  });

  describe("Last name tests", () => {
    const text = "Last Name";
    const testId = "last-name";
    it("renders field and title", rendersFiledAndTitle(text, testId));
    it("shows is required error", showsIsRequiredError(text, testId));
    it("shows max length error", showsMaxLengthError(text, testId));
  });

  describe("Institution tests", () => {
    const text = "Institution";
    const testId = "institution";

    it("renders field and title", rendersFiledAndTitle(text, testId));
    it("shows max length error", showsMaxLengthError(text, testId));
  });
});
