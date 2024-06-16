import { DiscussionContainerT, idT } from "@/lib/types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Get a discussion container by its ID, to access its discussions
 * @param id discussion container ID
 */
export async function fetchDiscussionContainer(
  id: idT,
): Promise<DiscussionContainerT> {
  const res = await fetch(`${baseUrl}/discussion-containers/${id}`);
  await validateResponse(res);
  return (await res.json()) as DiscussionContainerT;
}

/**
 * Gets data for a discussion given its ID.
 * @async
 * @param id Discussion ID
 */
export async function getDiscussionData(id: string) {
  // TODO
  // const res = await fetch();
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    id: id,
    anonymous: false,
    author: {
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      institution: "TU Delft",
      lastName: "Curie",
    },
    createdAt: "11 May 2024",
    deleted: false,
    deletedAt: "-",
    replies: [],
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut ducimus amet ex qui eius corrupti reiciendis, quibusdam suscipit, aspernatur ipsum. Reprehenderit libero molestias nostrum eum sed? Illo, quidem ad.",
    updatedAt: "11 May 2024",
  };
}

// TODO parameter type should include all data needed for a discussion
/**
 * Creates a new Discussion for a given Version.
 * @async
 * @param text Discussion contents
 * @param id discussion container ID
 */
export async function uploadDiscussion(text: string, id: idT) {
  // TODO
  // should include author, possible different discussion to reply to (and anything else that I'm forgetting)
  await new Promise((resolve) => setTimeout(resolve, 100));
  return `uploaded ${text} under id ${id}`;
}
