import { expect, describe, it } from "@jest/globals";

const dumFormData = {
  title: "title",
  authors: ["1"],
  contributors: ["2"],
  fields: ["3"],
  type: "type",
  completion: "completion",
  feedback: "feedback",
};

beforeEach(jest.resetModules);

describe("onSubmit tests", () => {
  it("shows something correct when validation passes", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    const { onSubmit } = require("@/new-post/lib/submit");
    expect(onSubmit(dumFormData)).toBe(true);
    expect(window.alert).toBeCalledWith(
      "Title: " +
        dumFormData.title +
        "\n" +
        "Authors: " +
        dumFormData.authors.map((a) => a.toString()) +
        "\n" +
        "Contributors: " +
        dumFormData.contributors.map((a) => a.toString()) +
        "\n" +
        "Fields: " +
        dumFormData.fields.map((a) => a.toString()) +
        "\n" +
        "Completion: " +
        dumFormData.completion +
        "\n" +
        "Type: " +
        dumFormData.type +
        "\n" +
        "Feedback: " +
        dumFormData.feedback,
    );
  });
});
