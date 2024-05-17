const { expect, describe, it } = require("@jest/globals");
import AuthorCard from "@/post/[id]/components/author-card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import getMemberData from "@/post/[id]/lib/member-api";

jest.mock("@/post/[id]/lib/member-api");

describe("AuthorCard", () => {
  const dummyMember = {
    id: "413256",
    email: "mariecurie@tudelft.nl",
    firstName: "Marie",
    picture: "/placeholders/Marie_Curie.jpg",
    institution: "TU Delft",
    lastName: "Curie",
  };

  (getMemberData as jest.Mock).mockResolvedValue(dummyMember);

  it("shows its label", async () => {
    const fullName = `${dummyMember.firstName} ${dummyMember.lastName}`;

    // Written like this because Jest currently doesn't support async
    // server-side components. https://github.com/testing-library/react-testing-library/issues/1209
    render(await AuthorCard({ memberId: dummyMember.id }));

    const nameElement = screen.getByText(fullName);
    expect(nameElement).toBeInTheDocument();
  });
});