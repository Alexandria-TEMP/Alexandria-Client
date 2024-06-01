import { expect, describe, it } from "@jest/globals";

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
    jest.mock("@/new-post/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => false),
      validateAuthors: jest.fn((s: Set<string>) => true),
    }));
    const { validate } = require("@/new-post/lib/submit");
    expect(validate(dumFormData)).toBe(false);
  });

  // it("fails when validate authors fails", () => {
  //   jest.mock("@/new-post/lib/validators", () => ({
  //     validateTitle: jest.fn((s: string) => true),
  //     validateAuthors: jest.fn((s: Set<string>) => false),
  //   }));
  //   const { validate } = require("@/new-post/lib/submit");
  //   expect(validate(dumFormData)).toBe(false);
  // });

  it("passes when validators pass", () => {
    jest.mock("@/new-post/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => true),
      validateAuthors: jest.fn((s: Set<string>) => true),
    }));
    const { validate } = require("@/new-post/lib/submit");
    expect(validate(dumFormData)).toBe(true);
  });
});

describe("onSubmit tests", () => {
  it("shows something wrong when validation fails", () => {
    jest.mock("@/new-post/lib/validators", () => ({
      validateTitle: jest.fn((s: string) => false),
      validateAuthors: jest.fn((s: Set<string>) => false),
    }));
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const { onSubmit } = require("@/new-post/lib/submit");
    expect(onSubmit(dumFormData)).toBe(false);
    expect(window.alert).toBeCalledWith("Something went wrong");
  });

  // it("shows something correct when validation passes", () => {
  //   jest.mock("@/new-post/lib/validators", () => ({
  //     validateTitle: jest.fn((s: string) => true),
  //     validateAuthors: jest.fn((s: Set<string>) => true),
  //   }));
  //   jest.spyOn(window, "alert").mockImplementation(() => {});
  //   const { onSubmit } = require("@/new-post/lib/onSubmit");
  //   expect(onSubmit(dumFormData)).toBe(true);
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
