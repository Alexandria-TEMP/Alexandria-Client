import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";

const dumFormData = {
  title: "title",
  authors: new Set("1"),
  contributors: new Set("2"),
  fields: new Set("3"),
  type: "type",
  completion: "completion",
  feedback: "feedback",
};

beforeEach(jest.resetModules);

describe("Validation tests", () => {
  it("fails when validate title fails", () => {
    jest.mock("@/newpost/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => false),
      validateAuthors: jest.fn((s: Set<string>) => true),
    }));
    const { validate } = require("@/newpost/lib/submit");
    expect(validate(dumFormData)).toBe(false);
  });

  it("fails when validate authors fails", () => {
    jest.mock("@/newpost/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => true),
      validateAuthors: jest.fn((s: Set<string>) => false),
    }));
    const { validate } = require("@/newpost/lib/submit");
    expect(validate(dumFormData)).toBe(false);
  });

  it("passes when validators pass", () => {
    jest.mock("@/newpost/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => true),
      validateAuthors: jest.fn((s: Set<string>) => true),
    }));
    const { validate } = require("@/newpost/lib/submit");
    expect(validate(dumFormData)).toBe(true);
  });
});

describe("Submit tests", () => {
  it("shows something wrong when validation fails", () => {
    jest.mock("@/newpost/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => false),
      validateAuthors: jest.fn((s: Set<string>) => false),
    }));
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const { submit } = require("@/newpost/lib/submit");
    expect(submit(dumFormData)).toBe(false);
    expect(window.alert).toBeCalledWith("Something went wrong");
  });

  // it("shows something correct when validation passes", () => {
  //   jest.mock("@/newpost/lib/validators", () => ({
  //     validateTitle: jest.fn((s: string) => true),
  //     validateAuthors: jest.fn((s: Set<string>) => true),
  //   }));
  //   jest.spyOn(window, "alert").mockImplementation(() => {});
  //   const { submit } = require("@/newpost/lib/submit");
  //   expect(submit(dumFormData)).toBe(true);
  //   expect(window.alert).toBeCalledWith(
  //     "Title: " +
  //       dumFormData.title +
  //       "\n" +
  //       "Authors: " +
  //       Array.from(dumFormData.authors.keys()).map((a) => a.toString()) +
  //       "\n" +
  //       "Contributors: " +
  //       Array.from(dumFormData.contributors.keys()).map((a) => a.toString()) +
  //       "\n" +
  //       "Fields: " +
  //       Array.from(dumFormData.fields.keys()).map((a) => a.toString()) +
  //       "\n" +
  //       "Completion: " +
  //       dumFormData.completion +
  //       "\n" +
  //       "Type: " +
  //       dumFormData.type +
  //       "\n" +
  //       "Feedback: " +
  //       dumFormData.feedback,
  //   );
  // });
});
