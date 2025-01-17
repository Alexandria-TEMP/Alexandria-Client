import { DiscussionT, MemberT, idT } from "@/lib/types/api-types";
import { fetchDiscussionData } from "../services/discussion-api";
import useSWR, { SWRResponse } from "swr";
import { fetchMemberData } from "../services/member-api";

/**
 * Fetches discussion and author data
 * @returns
 *    data: discussion data and author (or undefined if not loaded),
 *          NOTE author may be undefined in calse of an anonymous discussion
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useDiscussionAndAuthorData(
  id: idT,
): SWRResponse<{ discussion: DiscussionT; author: MemberT | null }, Error> {
  return useSWR(
    { id },
    async ({ id }) => {
      const discussion = await fetchDiscussionData(id);
      if (discussion.memberID == null)
        return { discussion: discussion, author: null };
      const author = await fetchMemberData(discussion.memberID);
      return { discussion, author };
    },
    {
      refreshInterval: 1000, // refresh every second otherwise SWR does some weird fuckery and says that the data is done loading even tho disucssion obj is still empty, it seems to not await stuff properly
    },
  );
}
