import {
  DiscussionContainerT,
  DiscussionT,
  ReplyDiscussionCreationFormtT,
  RootDiscussionCreationFormT,
  idT,
} from "@/lib/types/api-types";
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
 * Fetches discussion data
 * @param id Discussion ID
 */
export async function fetchDiscussionData(id: idT): Promise<DiscussionT> {
  const res = await fetch(`${baseUrl}/discussions/${id}`, {
    next: { revalidate: 5 },
  });
  await validateResponse(res);
  const disc: DiscussionT = (await res.json()) as DiscussionT;
  return disc;
}

/**
 * Send a post request to the server to post a root discussion
 * @param rootDiscussionCreationForm needs container id, text and whether its anonymous
 * @param accessToken of the currently logged in user
 * @returns the newly posted discussion
 */
export async function postDiscussionRoot(
  rootDiscussionCreationForm: RootDiscussionCreationFormT,
  accessToken: string,
): Promise<DiscussionT> {
  const jsonDiscussion = JSON.stringify(rootDiscussionCreationForm);
  const res = await fetch(`${baseUrl}/discussions/roots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: jsonDiscussion,
  });
  await validateResponse(res);
  return (await res.json()) as DiscussionT;
}

/**
 * Send a post request to the server to post a reply discussion
 * @param replyDiscussionCreationForm needs parent discussion id, text and whether its anonymous
 * @param accessToken of the currently logged in user
 * @returns the newly posted discussion
 */
export async function postDiscussionReply(
  replyDiscussionCreationForm: ReplyDiscussionCreationFormtT,
  accessToken: string,
): Promise<DiscussionT> {
  const jsonDiscussion = JSON.stringify(replyDiscussionCreationForm);
  const res = await fetch(`${baseUrl}/discussions/replies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: jsonDiscussion,
  });
  await validateResponse(res);
  return (await res.json()) as DiscussionT;
}
