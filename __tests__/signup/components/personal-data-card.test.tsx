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

describe("Personal data fields test", () => {
  beforeEach(() => {
    // TODO i cannot figure out how to mock the control and form state object
    // so i cannot individually render the personal data card component
    // so i am testing it by rendering the entire page, so that it has a proper useForm hook
    // const { rerender } = render(<SignupPage />);
    render(<SignupPage />);
  });

  describe("First name tests", () => {
    it("renders field and title", () => {
      const nameHeaderElem = screen.getByText("First Name");
      const nameInputElem = screen.getByTestId("first-name");

      expect(nameHeaderElem).toBeInTheDocument();
      expect(nameInputElem).toBeInTheDocument();
    });

    it("shows is required error", async () => {
      const user = userEvent.setup();
      const nameHeaderElem = screen.getByText("First Name");
      const nameInputElem = screen.getByTestId("first-name");

      await user.type(nameInputElem, "test");
      await user.clear(nameInputElem);
      await user.click(nameHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please enter your first name."),
        ).toBeInTheDocument();
      });
    });

    it("shows max length error", async () => {
      const user = userEvent.setup();
      const nameHeaderElem = screen.getByText("First Name");
      const nameInputElem = screen.getByTestId("first-name");

      await user.click(nameInputElem);
      await user.paste("a".repeat(101));
      await user.click(nameHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText(
            "There is a 100 charcter restriction on name input.",
          ),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Last name tests", () => {
    it("renders field and title", () => {
      const nameHeaderElem = screen.getByText("Last Name");
      const nameInputElem = screen.getByTestId("last-name");

      expect(nameHeaderElem).toBeInTheDocument();
      expect(nameInputElem).toBeInTheDocument();
    });

    it("shows is required error", async () => {
      const user = userEvent.setup();
      const nameHeaderElem = screen.getByText("Last Name");
      const nameInputElem = screen.getByTestId("last-name");

      await user.type(nameInputElem, "test");
      await user.clear(nameInputElem);
      await user.click(nameHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please enter your last name."),
        ).toBeInTheDocument();
      });
    });

    it("shows max length error", async () => {
      const user = userEvent.setup();
      const nameHeaderElem = screen.getByText("Last Name");
      const nameInputElem = screen.getByTestId("last-name");

      await user.type(nameInputElem, "a".repeat(101));
      await user.click(nameHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText(
            "There is a 100 charcter restriction on name input.",
          ),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Institution tests", () => {
    it("renders field and title", () => {
      const institutionHeaderElem = screen.getByText("Institution");
      const institutionInputElem = screen.getByTestId("institution");

      expect(institutionHeaderElem).toBeInTheDocument();
      expect(institutionInputElem).toBeInTheDocument();
    });

    it("shows max length error", async () => {
      const user = userEvent.setup();
      const institutionHeaderElem = screen.getByText("Institution");
      const institutionInputElem = screen.getByTestId("institution");

      await user.type(institutionHeaderElem, "a".repeat(151));
      await user.click(institutionHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText(
            "There is a 150 charcter restriction on institution name.",
          ),
        ).toBeInTheDocument();
      });
    });
  });
});
