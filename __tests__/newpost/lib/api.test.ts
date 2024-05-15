const { expect, describe, it } = require("@jest/globals");
import { getMembers } from "@/newpost/lib/member-api";
import { getFields } from "@/newpost/lib/fields-api";
import "@testing-library/jest-dom";
import { Member, Tag } from "@/lib/api-types";

// TODO write proper tests when API not hardcoded
describe("API", () => {
    it("returns correct type", () => {
        expect(getMembers()).toBeInstanceOf(Map<string, Member>);
        expect(getFields()).toBeInstanceOf(Map<string, Tag>);
    })
})