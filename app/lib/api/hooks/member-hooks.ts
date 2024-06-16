"use client";

import useSWR, { SWRResponse } from "swr";
import { MemberT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Hook that fetches all members from the database, using SWR for caching, loading and error states
 * Fetching all members from the database sounds like a very bad idea, but we would need some kind of lazy loading for MultiSelectAutocomplete otherwise
 * that is currently in todo
 * NOTE: currently the endpoint actually only returns id, first and last names as that is all that is needed
 * @returns the member objects as array, as well as other SWR states (loading, error)
 */
export function useFetchMembers(): SWRResponse<MemberT[], Error> {
  return useSWR(baseUrl + "/members", async (...args) => {
    const response = await fetch(...args); //by default a get request
    await validateResponse(response);
    const members: MemberT[] = (await response.json()) as MemberT[];
    return members;
  });
}
