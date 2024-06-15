import {
  branchUnionIDToPathID,
  pathIDToBranchUnionID,
  pathIDToPostUnionID,
  postUnionIDToPathID,
} from "@/lib/id-parser";
import { expect, describe, it } from "@jest/globals";

describe("pathIDToPostUnionID", () => {
  it("parses project post id", () =>
    expect(pathIDToPostUnionID("p-45136")).toStrictEqual({
      id: 45136,
      isProject: true,
    }));

  it("parses regular post id", () =>
    expect(pathIDToPostUnionID("r-45136")).toStrictEqual({
      id: 45136,
      isProject: false,
    }));

  it("doesn't parse unexpected character", () =>
    expect(() => pathIDToPostUnionID("c-45136")).toThrow());

  it("doesn't parse invalid format", () =>
    expect(() => pathIDToPostUnionID("45136")).toThrow());
});

describe("pathIDToBranchUnionID", () => {
  it("parses open branch id", () =>
    expect(pathIDToBranchUnionID("o-45136")).toStrictEqual({
      id: 45136,
      isClosed: false,
    }));

  it("parses closed branch id", () =>
    expect(pathIDToBranchUnionID("c-45136")).toStrictEqual({
      id: 45136,
      isClosed: true,
    }));

  it("doesn't parse unexpected character", () =>
    expect(() => pathIDToBranchUnionID("r-45136")).toThrow());

  it("doesn't parse invalid format", () =>
    expect(() => pathIDToBranchUnionID("45136")).toThrow());
});

describe("postUnionIDToPathID", () => {
  it("converts project post", () =>
    expect(postUnionIDToPathID({ id: 45136, isProject: true })).toBe(
      "p-45136",
    ));

  it("converts regular post", () =>
    expect(postUnionIDToPathID({ id: 45136, isProject: false })).toBe(
      "r-45136",
    ));
});

describe("branchUnionIDToPathID", () => {
  it("converts closed branch", () =>
    expect(branchUnionIDToPathID({ id: 45136, isClosed: true })).toBe(
      "c-45136",
    ));

  it("converts open branch", () =>
    expect(branchUnionIDToPathID({ id: 45136, isClosed: false })).toBe(
      "o-45136",
    ));
});
