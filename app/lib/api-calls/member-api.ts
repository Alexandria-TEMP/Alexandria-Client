// methods in this file will be heavily changed once integration with back end it done
// just retrieve some dummy data for now

import { MemberT, idT } from "../types/api-types";
import { baseUrl } from "./api-common";

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
 * Method that gets all members from the database, should be deprecated?
 * @returns A map of all members with their database id as key, and the whole member object as value
 */
export async function getMembers(): Promise<MemberT[]> {
  const response = await fetch(baseUrl + "/members"); //by default a get request
  //disable reason: idk how to fix this and still get the correct type cause typescript
  // i have to look into this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const members: MemberT[] = await response.json();
  return members;
}
