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
  } else if (id == "2") {
    return {
      id: "2",
      email: "kopernicus@tudelft.nl",
      firstName: "Nicolaus",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Copernicus",
    };
  } else if (id == "3") {
    return {
      id: "3",
      email: "kopernicus@tudelft.nl",
      firstName: "Metal Bar",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Clanging",
    };
  } else {
    return {
      id: "4",
      email: "kopernicus@tudelft.nl",
      firstName: "Michael",
      institution: "TU Delft",
      picture: "/placeholders/Nikolaus_Kopernikus.jpg",
      lastName: "Yippie",
    };
  }
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
