"use client";

import useSWR, { SWRResponse } from "swr";
import {
  fetchBranchData,
  fetchBranchReviewStatuses,
} from "../services/branch-api";
import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import { BranchReviewDecisionT } from "@/lib/types/api-types";

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
  return useSWR(id, fetchBranchData);
}

/**
 *
 * @returns
 *    data:  (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useBranchAndReviewData(
  id: idBranchUnionT,
): SWRResponse<
  { branchUnion: BranchUnionT; reviews: BranchReviewDecisionT[] },
  Error
> {
  return useSWR(id, async (id) => {
    const branchUnion = await fetchBranchData(id);
    const reviews = await fetchBranchReviewStatuses(branchUnion.branch.id);
    return { branchUnion, reviews };
  });
}
