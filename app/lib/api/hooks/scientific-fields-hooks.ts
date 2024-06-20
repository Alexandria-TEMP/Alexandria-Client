"use client";

import useSWR, { SWRResponse } from "swr";
import { ScientificFieldTagT, idT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";
import { fetchScientificFieldsFromContainer } from "../services/fields-api";

/**
 * Hook that fetches all scientific fields from the database, using SWR for caching, loading and error states
 * Fetching all tags from the database sounds like a very bad idea, but we would need some kind of lazy loading
 * for MultiSelectAutocomplete otherwise that is currently in todo
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

/**
 * Hook that gets all the scientific field tag objects in a container, by id
 * @param id of the container
 * @returns an SWR response containing an array of scientific field tag id, loading and erorr states
 */
export function useScientificFieldsByContainer(
  id: idT,
): SWRResponse<ScientificFieldTagT[], Error> {
  return useSWR({ cid: id }, (key) =>
    fetchScientificFieldsFromContainer(key.cid),
  );
}
