import { expect, describe, it } from "@jest/globals";
import AuthorCard from "@/post/[postId]/components/cards/author-card";
import { render, screen } from "@testing-library/react";
import { fetchMemberData } from "@/lib/api/services/member-api";
import { dummyMembers } from "~/__tests__/__utils__/dummys";

jest.mock("@/lib/api/services/member-api");

describe("AuthorCard", () => {
  const dummyMember = dummyMembers[0];
  (fetchMemberData as jest.Mock).mockResolvedValue(dummyMember);

  it("shows its label", async () => {
    const fullName = `${dummyMember.firstName} ${dummyMember.lastName}`;

    // Written like this because Jest currently doesn't support async
    // server-side components. https://github.com/testing-library/react-testing-library/issues/1209
    render(await AuthorCard({ id: dummyMember.id }));

    const nameElement = screen.getByText(fullName);
    expect(nameElement).toBeInTheDocument();
  });
});
