import { expect, describe, it } from "@jest/globals";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom";
import { validateAuthors, validateTitle } from "@/newpost/lib/validators";

describe("Tests title validator", () => {
  it("gives error message for empty title", () => {
    expect(validateTitle("")).toBe("Please enter a title for your post.");
  });

  it("gives error message for too long of a title", () => {
    expect(validateTitle("a".repeat(101))).toBe(
      "Title can have at most 100 characters.",
    );
  });

  it("works with correct input", () => {
    expect(validateTitle("a")).toBe(true);
    expect(validateTitle("a".repeat(100))).toBe(true);
  });
});

describe("Authors list validator", () => {
  it("does not accept empty list", () => {
    expect(validateAuthors([])).toBe(
      "You must select at least one author for your post.",
    );
  });

  it("works with correct input", () => {
    expect(validateAuthors(["1", "2"])).toBe(true);
  });
});
