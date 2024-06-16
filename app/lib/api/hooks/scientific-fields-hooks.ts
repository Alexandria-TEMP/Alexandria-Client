"use client";

import useSWR, { SWRResponse } from "swr";
import { ScientificFieldTagT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Hook that fetches all scientific fields from the database, using SWR for caching, loading and error states
 * Fetching all tags from the database sounds like a very bad idea, but we would need some kind of lazy loading for MultiSelectAutocomplete otherwise
 * that is currently in todo
 * @returns the scientific field objects as array, as well as other SWR states (loading, error)
 */
export function useScientificFields(): SWRResponse<
  ScientificFieldTagT[],
  Error
> {
  return useSWR(baseUrl + "/tags/scientific", async (...args) => {
    const response = await fetch(...args);
    await validateResponse(response);
    const scientificFieldTags: ScientificFieldTagT[] =
      (await response.json()) as ScientificFieldTagT[];
    return scientificFieldTags;
  });
}
