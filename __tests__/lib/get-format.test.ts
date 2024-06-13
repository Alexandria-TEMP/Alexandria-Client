import { expect, describe, it } from "@jest/globals";
import { getMemberName, getFieldName, getByteMultiple } from "@/lib/get-format";
import { dummyMembers, dummyScientificField } from "../__utils__/dummys";

describe("API getters formatting helper", () => {
  it("gets full name", () => {
    expect(getMemberName(dummyMembers[0])).toBe("Marie Curie");
    expect(getMemberName(undefined)).toBe("Not found");
  });

  it("gets field name", () => {
    expect(getFieldName(dummyScientificField)).toBe("Computer Science");
    expect(getFieldName(undefined)).toBe("Not found");
  });
});

describe("getByteMultiple", () => {
  it("converts to GB", () => {
    expect(getByteMultiple(9_541_123_953)).toBe("9.54 GB");
  });

  it("converts to MB", () => {
    expect(getByteMultiple(62_891_123)).toBe("62.89 MB");
  });

  it("converts to kB", () => {
    expect(getByteMultiple(895_011)).toBe("895.01 kB");
  });

  it("converts to B", () => {
    expect(getByteMultiple(180)).toBe("180 B");
  });

  it("complains on error", () => {
    expect(getByteMultiple(-52)).toBe("invalid");
  });
});
