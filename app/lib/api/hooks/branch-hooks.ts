"use client";

import useSWR, { SWRResponse } from "swr";
import { fetchBranchData } from "../services/branch-api";
import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";

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
