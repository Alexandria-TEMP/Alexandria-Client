import { Post } from "@/lib/api-types";

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

export const dummyMembers = [
  {
    id: "413256",
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
];

export const dummyPost: Post = {
  title: "Post title",
  status: "Open for review",
  collaborators: ["1", "2"],
  createdAt: new Date(10, 4, 2024),
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
  updatedAt: new Date(11, 4, 2024),
};

export const dummyTag = {
  id: "1",
  tag: "Computer Science",
  tagType: "ScientificField",
};

export const dummyMergeRequests = {
  rejected: {
    id: "5423623",
    title: "Remove contents section",
    version: "1",
    reviews: ["accept", "reject", "accept"],
    anonymous: false,
    createdAt: "19 May 2024",
    collaborators: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificTags: ["Mathematics"],
    mergeRequestStatus: "rejected",
    versionWhenClosed: "2",
    closedAt: "20 May 2024",
  },
  open: {
    id: "086146",
    title: "Add new experiment",
    version: "1",
    reviews: ["accept", "reject"],
    anonymous: false,
    createdAt: "19 May 2024",
    collaborators: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificTags: ["Mathematics"],
    mergeRequestStatus: "open",
    versionWhenClosed: "2",
    closedAt: "20 May 2024",
  },
  accepted: {
    id: "743865399",
    title: "Expand literature review",
    version: "1",
    reviews: ["accept", "accept", "accept"],
    anonymous: false,
    createdAt: "19 May 2024",
    collaborators: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificTags: ["Mathematics"],
    mergeRequestStatus: "accepted",
    versionWhenClosed: "2",
    closedAt: "20 May 2024",
  },
};

export const dummyHtml = {
  html: `
  <!DOCTYPE html>
  <html>
    <body>
      <h1>This is a heading</h1>
      <p>This is a paragraph</p>
    </body>
  </html>
  `,
};
