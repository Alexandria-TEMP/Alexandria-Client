import { expect, describe, it } from "@jest/globals";
import { render } from "@testing-library/react";
import PostCardMini from "@/post/[postId]/components/cards/post-card-mini";
import { dummyPostUnion } from "~/__tests__/__utils__/dummys";
import { idT } from "@/lib/types/api-types";
import { usePostData } from "@/lib/api/hooks/post-hooks";

jest.mock("@/lib/api/hooks/post-hooks");

// Mock useRouter so it exists when component is rendered
jest.mock("next/navigation");

describe("PostCardMini", () => {
  (usePostData as jest.Mock).mockReturnValue({
    data: dummyPostUnion.withProject,
    isLoading: false,
  });

  it("matches snapshot", () => {
    const { container } = render(
      <PostCardMini
        id={dummyPostUnion.withProject.id.id as idT}
        isProject={dummyPostUnion.withProject.id.isProject}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
