import { expect, describe, it } from "@jest/globals";
import AuthorCard from "@/post/[id]/components/author-card";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import getMemberData from "@/lib/api-calls/member-api";
import { dummyMember } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api-calls/member-api");

describe("AuthorCard", () => {
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
