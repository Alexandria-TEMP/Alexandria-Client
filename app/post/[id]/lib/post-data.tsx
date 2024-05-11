export default async function getPostData(id: string) {
  // TODO
  // const res = await fetch();

  return {
    title: "Post title",
    status: "Open for review",
    collaborators: [
      {
        email: "mariecurie@tudelft.nl",
        firstName: "Marie",
        institution: "TU Delft",
        lastName: "Curie",
      },
      {
        email: "mariecurie@tudelft.nl",
        firstName: "Marie",
        institution: "TU Delft",
        lastName: "Curie",
      },
    ],
    createdAt: "10 May 2024",
    currentVersion: {
      discussions: ["1"],
    },
    id: id,
    postType: "Reflection",
    scientificFieldTags: [
      "Computer Science",
      "Theory of computation",
      "Mathematical optimization",
    ],
    updatedAt: "11 May 2024",
  };
}
