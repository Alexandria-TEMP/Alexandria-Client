import { MemberT, idT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export default async function fetchMemberData(id: idT): Promise<MemberT> {
  const res = await fetch(`${baseUrl}/members/${id}`);
  await validateResponse(res);
  return (await res.json()) as MemberT;
}

/**
 * Method that gets all members from the database, should be deprecated?
 * @returns A map of all members with their database id as key, and the whole member object as value
 */
export async function getMembers() {
  // TODO implement
  // TODO edit jsdoc (deprecation remark)
  // pretend this does multiple fetches
  await new Promise((resolve) => setTimeout(resolve, 100));
  const members = [
    {
      id: "1",
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      picture: "/placeholders/Marie_Curie.jpg",
      institution: "TU Delft",
      lastName: "Curie",
    },
    {
      id: "2",
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Copernicus",
    },
    {
      id: "3",
      email: "kopernicus@tudelft.nl",
      firstName: "Metal Bar",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Clanging",
    },
    {
      id: "4",
      email: "kopernicus@tudelft.nl",
      firstName: "Michael",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Yippie",
    },
  ];

  return members;
}
