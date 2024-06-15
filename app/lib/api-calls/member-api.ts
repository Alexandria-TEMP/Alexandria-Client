// methods in this file will be heavily changed once integration with back end it done
// just retrieve some dummy data for now

import useSWR, { SWRResponse } from "swr";
import { MemberT, idT } from "../types/api-types";
import { baseUrl, validateResponse } from "./api-common";

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export default async function getMemberData(id: idT): Promise<MemberT> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (id == 1) {
    return {
      id,
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      institution: "TU Delft",
      lastName: "Curie",
      scientificFields: [],
    };
  } else if (id == 2) {
    return {
      id,
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      lastName: "Copernicus",
      scientificFields: [],
    };
  } else if (id == 3) {
    return {
      id,
      email: "kopernicus@tudelft.nl",
      firstName: "Metal Bar",
      institution: "TU Delft",
      lastName: "Clanging",
      scientificFields: [],
    };
  } else {
    return {
      id,
      email: "kopernicus@tudelft.nl",
      firstName: "Michael",
      institution: "TU Delft",
      lastName: "Yippie",
      scientificFields: [],
    };
  }
}

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
