export const dummyDiscussion = {
  id: "4321",
  anonymous: false,
  author: {
    email: "mariecurie@tudelft.nl",
    firstName: "Marie",
    institution: "TU Delft",
    lastName: "Curie",
  },
  createdAt: "11 May 2024",
  deleted: false,
  deletedAt: "-",
  replies: [],
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut ducimus amet ex qui eius corrupti reiciendis, quibusdam suscipit, aspernatur ipsum. Reprehenderit libero molestias nostrum eum sed? Illo, quidem ad.",
  updatedAt: "11 May 2024",
};

export const dummyMember = {
  id: "413256",
  email: "mariecurie@tudelft.nl",
  firstName: "Marie",
  picture: "/placeholders/Marie_Curie.jpg",
  institution: "TU Delft",
  lastName: "Curie",
};

export const dummyPost = {
  title: "Post title",
  status: "Open for review",
  collaborators: ["1", "2"],
  createdAt: "10 May 2024",
  currentVersion: {
    id: "1",
    discussions: ["1", "1", "1", "1"],
  },
  id: "43125",
  postType: "Reflection",
  scientificFieldTags: [
    "Computer Science",
    "Mathematics",
    "Theory of computation",
  ],
  updatedAt: "11 May 2024",
};
