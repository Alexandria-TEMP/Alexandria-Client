const { expect, describe, it } = require("@jest/globals");
import { getMemberName, getFieldName } from "@/lib/get-format";

const dumMember = {
    id: "1",
    email: "mariecurie@tudelft.nl",
    firstName: "Marie",
    picture: "/placeholders/Marie_Curie.jpg",
    institution: "TU Delft",
    lastName: "Curie",
  };

const dumTag =  {
        id: "1",
        tag: "Computer Science",
        tagType: "ScientificField",
}

describe("API getters formatting helper", () => {
    it("gets full name", () => {
        expect(getMemberName(dumMember)).toBe("Marie Curie");
        expect(getMemberName(undefined)).toBe("Not found");
    });

    it("gets field name", () => {
        expect(getFieldName(dumTag)).toBe("Computer Science");
        expect(getFieldName(undefined)).toBe("Not found")
    });
})
