const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { onSubmit, FormData } from "@/signup/lib/submit";

// TODO update tests when this is actually integrated with backend
describe("dummy onSubmit test", () => {
  const dumFormData = {
    email: "e@mail.me",
    firstName: "first name",
    lastName: "last name",
    institution: "institution", // TODO might be nice to have some sort of list of institutions,
    fields: ["1", "2"],
    password: "pass",
  };

  it("shows alert", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    expect(onSubmit(dumFormData)).toBe(true);
    expect(window.alert).toBeCalledWith(
      "Email: " +
        dumFormData.email +
        "\n" +
        "First Name: " +
        dumFormData.firstName +
        "\n" +
        "Last Name: " +
        dumFormData.lastName +
        "\n" +
        "Institution: " +
        dumFormData.institution +
        "\n" +
        "Password: " +
        dumFormData.password,
    );
  });
});
