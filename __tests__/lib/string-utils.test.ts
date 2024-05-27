import { capitalizeFirstLetter } from "@/lib/string-utils";
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
