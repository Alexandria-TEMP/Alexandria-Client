import { capitalizeFirstLetter, parseId } from "@/lib/string-utils";
import { idType } from "@/lib/types/api-types";
import { expect } from "@jest/globals";

describe("StringUtils capitalizeFirstLetter", () => {
  it("doesn't throw error on empty string", () => {
    expect(() => capitalizeFirstLetter("")).not.toThrow();
  });

  it("capitalizes 1-letter string", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  it("capitalizes word", () => {
    expect(capitalizeFirstLetter("testing")).toBe("Testing");
  });

  it("keeps rest of string intact", () => {
    expect(capitalizeFirstLetter("teStINg")).toBe("TeStINg");
  });
});

describe("StringUtils parseId", () => {
  it("converts strings", () => {
    const test: string = "19432";
    const expected: idType = 19432;
    expect(parseId(test)).toBe(expected);
  });

  it("throws error on NaN", () => {
    expect(() => parseId("this is not a number")).toThrow();
  });
});
