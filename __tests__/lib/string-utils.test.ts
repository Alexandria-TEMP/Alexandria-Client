import { capitalizeFirstLetter, idStringToIDT } from "@/lib/string-utils";
import { idT } from "@/lib/types/api-types";
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
    const expected: idT = 19432;
    expect(idStringToIDT(test)).toBe(expected);
  });

  it("throws error on NaN", () => {
    expect(() => idStringToIDT("this is not a number")).toThrow();
  });
});
