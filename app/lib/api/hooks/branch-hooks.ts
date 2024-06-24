"use client";

import useSWR, { SWRResponse } from "swr";
import {
  fetchBranchData,
  fetchBranchesCanReview,
} from "../services/branch-api";
import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import { idT } from "@/lib/types/api-types";

/**
 * Fetches branch or closed branch data in a unified object
 * @returns
 *    data: branch and optionally closed branch data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useBranchData(
  id: idBranchUnionT,
): SWRResponse<BranchUnionT, Error> {
  return useSWR(id, fetchBranchData, {
    revalidateOnMount: true,
    refreshInterval: 5000,
  });
}

/**
 * Check if a user can review a branch
 * @param id the id of the branch we are checking
 * @param accessToken the access token of the currently logged in user
 * @returns whether or not the user can review
 */
export function useCanReview(
  id: idT,
  accessToken: string | undefined,
): SWRResponse<boolean, Error> {
  return useSWR("useless", async () => {
    // url param is uselss in this case, i need 2 params to pass to the function and SWR doest do that
    return await fetchBranchesCanReview(id, accessToken);
  });
}
