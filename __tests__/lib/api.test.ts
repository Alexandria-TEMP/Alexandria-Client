import { expect, describe, it } from "@jest/globals";
import { getMembers } from "@/lib/api-calls/member-api";
import { getFields } from "@/lib/api-calls/fields-api";
import { Member, Tag } from "@/lib/types/api-types";
import {
  getDiscussionData,
  uploadDiscussion,
} from "@/lib/api-calls/discussion-api";
import getMemberData from "@/lib/api-calls/member-api";
import getPostData from "@/lib/api-calls/post-api";
import "@testing-library/jest-dom";

// TODO write proper tests when API not hardcoded
describe("API", () => {
  it("returns correct type", () => {
    expect(getMembers()).toBeInstanceOf(Map<string, Member>);
    expect(getFields()).toBeInstanceOf(Map<string, Tag>);
  });

  it("exists", () => {
    const id = "1";
    expect(getPostData(id)).toMatchObject({});
    expect(getMemberData(id)).toMatchObject({});
    expect(getMemberData("2")).toMatchObject({});
    expect(getDiscussionData(id)).toMatchObject({});
    expect(uploadDiscussion("", id)).toMatchObject({});
  });
});
