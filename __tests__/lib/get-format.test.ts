import { expect, describe, it } from "@jest/globals";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { dummyMembers, dummyTag } from "../__utils__/dummys";

describe("API getters formatting helper", () => {
  it("gets full name", () => {
    expect(getMemberName(dummyMembers[0])).toBe("Marie Curie");
    expect(getMemberName(undefined)).toBe("Not found");
  });

  it("gets field name", () => {
    expect(getFieldName(dummyTag)).toBe("Computer Science");
    expect(getFieldName(undefined)).toBe("Not found");
  });
});
