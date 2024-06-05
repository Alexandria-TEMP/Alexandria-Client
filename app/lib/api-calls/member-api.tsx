// methods in this file will be heavily changed once integration with back end it done
// just retrieve some dummy data for now

/**
 * Gets data for a Member given their ID.
 * @async
 * @param id Member ID
 */
export default async function getMemberData(id: string) {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (id == "1") {
    return {
      id: "1",
      email: "mariecurie@tudelft.nl",
      firstName: "Marie",
      picture: "/placeholders/Marie_Curie.jpg",
      institution: "TU Delft",
      lastName: "Curie",
    };
  } else {
    return {
      id: "2",
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Copernicus",
    };
  }
}

/**
 * Method that gets all members from the database
 * @returns A map of all members with their database id as key, and the whole member object as value
 */
export function getMembers() {
  // TODO

  // simulate long time to get list of users, this should be done without fetching all users
  // ideally we would fetch as we go but i dont really know how to do that
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

  return new Map(members.map((m) => [m.id, m]));
}
