import useSWR, { SWRResponse } from "swr";
import { ScientificFieldT } from "../types/api-types";
import { baseUrl, validateResponse } from "./api-common";

/**
 * Hook that fetches all scientific fields from the database, using SWR for caching, loading and error states
 * Fetching all tags from the database sounds like a very bad idea, but we would need some kind of lazy loading for MultiSelectAutocomplete otherwise
 * that is currently in todo
 * @returns the scientific field objects as array, as well as other SWR states (loading, error)
 */
export function useScientificFields(): SWRResponse<ScientificFieldT[], Error> {
  return useSWR(baseUrl + "/tags/scientific", async (...args) => {
    const response = await fetch(...args);
    await validateResponse(response);
    //disable reason: idk how to fix this and still get the correct type cause typescript
    // i have to look into this
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const scientificFieldTags: ScientificFieldT[] = await response.json();
    return scientificFieldTags;
  });
}
