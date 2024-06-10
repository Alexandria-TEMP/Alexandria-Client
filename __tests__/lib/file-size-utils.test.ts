import { numberToByteMultiple } from "@/lib/file-size-utils";
import { expect, describe, it } from "@jest/globals";

describe("numberToByteMultiple", () => {
  it("converts to GB", () => {
    expect(numberToByteMultiple(9_541_123_953)).toBe("9.54 GB");
  });

  it("converts to MB", () => {
    expect(numberToByteMultiple(62_891_123)).toBe("62.89 MB");
  });

  it("converts to kB", () => {
    expect(numberToByteMultiple(895_011)).toBe("895.01 kB");
  });

  it("converts to B", () => {
    expect(numberToByteMultiple(180)).toBe("180 B");
  });

  it("complains on error", () => {
    expect(numberToByteMultiple(-52)).toBe("invalid");
  });
});
