const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupPage from "@/signup/page";

describe("Account data fields test", () => {
  beforeEach(() => {
    // TODO i cannot figure out how to mock the control and form state object
    // so i cannot individually render the personal data card component
    // so i am testing it by rendering the entire page, so that it has a proper useForm hook
    // const { rerender } = render(<SignupPage />);
    render(<SignupPage />);
  });

  describe("Email tests", () => {
    it("renders field and title", () => {
      const emailHeaderElem = screen.getByText("Email");
      const emailInputElem = screen.getByTestId("email");

      expect(emailHeaderElem).toBeInTheDocument();
      expect(emailInputElem).toBeInTheDocument();
    });

    it("shows is required error", async () => {
      const user = userEvent.setup();
      const emailHeaderElem = screen.getByText("Email");
      const emailInputElem = screen.getByTestId("email");

      await user.type(emailInputElem, "test");
      await user.clear(emailInputElem);
      await user.click(emailHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please enter an email address."),
        ).toBeInTheDocument();
      });
    });

    it("shows incorrect format error", async () => {
      const user = userEvent.setup();
      const emailHeaderElem = screen.getByText("Email");
      const emailInputElem = screen.getByTestId("email");

      await user.type(emailInputElem, "a");
      await user.click(emailHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a valid email address."),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Password tests", () => {
    it("renders field and title", () => {
      const pwdHeaderElem = screen.getByText("Password");
      const pwdInputElem = screen.getByTestId("password");

      expect(pwdHeaderElem).toBeInTheDocument();
      expect(pwdInputElem).toBeInTheDocument();
    });

    it("shows is required error", async () => {
      const user = userEvent.setup();
      const pwdHeaderElem = screen.getByText("Password");
      const pwdInputElem = screen.getByTestId("password");

      await user.type(pwdInputElem, "test");
      await user.clear(pwdInputElem);
      await user.click(pwdHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please enter a password."),
        ).toBeInTheDocument();
      });
    });

    it("shows min length error", async () => {
      const user = userEvent.setup();
      const pwdHeaderElem = screen.getByText("Password");
      const pwdInputElem = screen.getByTestId("password");

      await user.type(pwdInputElem, "a");
      await user.click(pwdHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Password must contain at least 8 charcters."),
        ).toBeInTheDocument();
      });
    });

    it("shows incorrect format error", async () => {
      const user = userEvent.setup();
      const pwdHeaderElem = screen.getByText("Password");
      const pwdInputElem = screen.getByTestId("password");

      await user.type(pwdInputElem, "a".repeat(8));
      await user.click(pwdHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText(
            "Password must contain at least one upper case and one lower case letter, a number and a special character.",
          ),
        ).toBeInTheDocument();
      });
    });
  });

  describe("Confirm password tests", () => {
    it("renders field and title", () => {
      const confPwdHeaderElem = screen.getByText("Confirm Password");
      const confPwdInputElem = screen.getByTestId("confirm-pwd");

      expect(confPwdHeaderElem).toBeInTheDocument();
      expect(confPwdInputElem).toBeInTheDocument();
    });

    it("shows is required error", async () => {
      const user = userEvent.setup();
      const confPwdHeaderElem = screen.getByText("Confirm Password");
      const confPwdInputElem = screen.getByTestId("confirm-pwd");

      await user.type(confPwdInputElem, "a");
      await user.clear(confPwdInputElem);
      await user.click(confPwdHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Please re-enter your password."),
        ).toBeInTheDocument();
      });
    });

    it("shows not matching error", async () => {
      const user = userEvent.setup();
      const confPwdHeaderElem = screen.getByText("Confirm Password");
      const confPwdInputElem = screen.getByTestId("confirm-pwd");
      const pwdInputElem = screen.getByTestId("password");

      await user.type(pwdInputElem, "aaaaaaaaA!1");
      await user.type(confPwdInputElem, "a");
      await user.click(confPwdHeaderElem); // click away for error to appear

      await waitFor(() => {
        expect(
          screen.getByText("Your passwords do not match."),
        ).toBeInTheDocument();
      });
    });
  });
});
