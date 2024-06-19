import { DiscussionContainerT, DiscussionT, idT } from "@/lib/types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Get a discussion container by its ID, to access its discussions
 * @param id discussion container ID
 */
export async function fetchDiscussionContainer(
  id: idT,
): Promise<DiscussionContainerT> {
  const res = await fetch(`${baseUrl}/discussion-containers/${id}`, {
    next: { revalidate: 5 },
  });
  await validateResponse(res);
  return (await res.json()) as DiscussionContainerT;
}

/**
 * Fetches discussion data
 * @param id Discussion ID
 */
export async function fetchDiscussionData(id: idT): Promise<DiscussionT> {
  const res = await fetch(`${baseUrl}/discussions/${id}`);
  await validateResponse(res);
  return (await res.json()) as DiscussionT;
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
