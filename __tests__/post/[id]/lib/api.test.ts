const { expect, describe, it } = require("@jest/globals");
import {
  getDiscussionData,
  uploadDiscussion,
} from "@/post/[id]/lib/discussion-api";
import getMemberData from "@/post/[id]/lib/member-api";
import getPostData from "@/post/[id]/lib/post-api";
import "@testing-library/jest-dom";

describe("API", () => {
  // TODO test api functions, once they're not hardcoded
  it("exists", () => {
    const id = "1";
    expect(getPostData(id)).toMatchObject({});
    expect(getMemberData(id)).toMatchObject({});
    expect(getMemberData("2")).toMatchObject({});
    expect(getDiscussionData(id)).toMatchObject({});
    expect(uploadDiscussion("", id)).toMatchObject({});
  });
});
