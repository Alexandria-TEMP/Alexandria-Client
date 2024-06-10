import { getNestedValue } from "@/lib/object-utils";
import { expect, describe, it } from "@jest/globals";

describe("getNestedValue", () => {
  it("gets value if it exists as leaf", () => {
    expect(getNestedValue({ a: { b: { c: 10 } } }, ["a", "b", "c"])).toBe(10);
  });

  it("gets value if it exists as node", () => {
    expect(getNestedValue({ a: { b: { c: 10 } } }, ["a", "b"])).toStrictEqual({
      c: 10,
    });
  });

  it("returns undefined if value doesn't exist", () => {
    expect(getNestedValue({ a: { b: { c: 10 } } }, ["b", "a"])).toBe(undefined);
  });
});
