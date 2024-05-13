export function getMemberData(id: string) {
  // TODO
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

export function getMembers() {
  // TODO

  // simulate long time to get list of users, this should be done without fetching all users
  // ideally we would fetch as we go but i dont really know how to do that
  // await new Promise((resolve) => setTimeout(resolve, 3000));
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
