import { BranchReviewT, idT } from "@/lib/types/api-types";
import { baseUrl, validateResponse } from "../api-common";
import useSWR, { SWRResponse } from "swr";

/**
 * Fetches review data
 * @returns
 *    data: review data (or undefined if not loaded),
 *    error: error thrown by fetcher (or undefined),
 *    isLoading: if there's an ongoing request and no "loaded data"
 */
export function useReviewData(id: idT): SWRResponse<BranchReviewT, Error> {
  return useSWR(`${baseUrl}/branches/reviews/${id}`, async (url: string) => {
    const res = await fetch(url);
    await validateResponse(res);
    return (await res.json()) as BranchReviewT;
  });
}
