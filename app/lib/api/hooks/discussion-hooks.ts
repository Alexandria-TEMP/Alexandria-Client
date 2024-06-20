import { DiscussionT, MemberT, idT } from "@/lib/types/api-types";
import { fetchDiscussionData } from "../services/discussion-api";
import useSWR, { SWRResponse } from "swr";
import { fetchMemberData } from "../services/member-api";

/**
 * Fetches discussion and author data
 * @returns
 *    data: discussion data and author (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useDiscussionAndAuthorData(
  id: idT,
): SWRResponse<{ discussion: DiscussionT; author: MemberT }, Error> {
  return useSWR({ id }, async ({ id }) => {
    const discussion = await fetchDiscussionData(id);
    const author = await fetchMemberData(discussion.memberID);
    return { discussion, author };
  });
}
