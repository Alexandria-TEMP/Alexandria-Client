import { MemberT, idT } from "../../types/api-types";

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
