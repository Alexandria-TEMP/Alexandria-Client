import { parseFileTree } from "@/lib/file-tree-handler";
import { expect, describe, it } from "@jest/globals";

describe("parseFileTree", () => {
  it("handles nested items", () => {
    expect(
      parseFileTree({ "a/b/c/d.js": 1, "a/b/c": -1, "a/b": -1, a: -1 }),
    ).toStrictEqual({
      a: { b: { c: { "d.js": 1 } } },
    });
  });

  it("handles singular item", () => {
    expect(parseFileTree({ "a/b/c/d.js": 1 })).toStrictEqual({
      a: { b: { c: { "d.js": 1 } } },
    });
  });

  it("handles multiple items", () => {
    expect(
      parseFileTree({ "a.js": 1, "b.js": 2, c: -1, "c/d.js": 1 }),
    ).toStrictEqual({
      "a.js": 1,
      "b.js": 2,
      c: { "d.js": 1 },
    });
  });
});
