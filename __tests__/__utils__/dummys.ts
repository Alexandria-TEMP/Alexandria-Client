import { BranchT, PostT, ReviewT } from "@/lib/types/api-types";

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

export const dummyPost: PostT = {
  title: "Post title",
  status: "Open for review",
  collaborators: ["1", "2"],
  authors: ["1", "2"],
  contributors: ["1", "2"],
  anonymous: false,
  feedbackPreferences: "Formal feedback",
  completionStatus: "Ideation",
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
  updatedAt: "04 June 2024",
};

export const dummyTag = {
  id: "1",
  tag: "Computer Science",
  tagType: "ScientificField",
};

export const dummyBranches: {
  rejected: BranchT;
  accepted: BranchT;
  open: BranchT;
} = {
  rejected: {
    id: 547964732,
    newPostTitle: "Post title",
    projectPostID: 1,
    branchTitle: "Remove contents section",
    newVersionID: 1,
    reviewIDs: [0, 1, 2],
    createdAt: "19 May 2024",
    collaboratorIDs: [0, 1],
    updatedAt: "20 May 2024",
    updatedCompletionStatus: "ideation",
    updatedScientificFields: ["Mathematics"],
    branchReviewStatus: "rejected",
    previousVersionID: 2,
  },
  open: {
    id: 547964732,
    newPostTitle: "Post title",
    projectPostID: 1,
    branchTitle: "Do some stuff",
    newVersionID: 1,
    reviewIDs: [0, 1, 2],
    anonymous: false,
    createdAt: "19 May 2024",
    collaboratorIDs: [0, 1],
    updatedAt: "20 May 2024",
    updatedCompletionStatus: "ideation",
    updatedScientificFields: ["Mathematics"],
    branchReviewStatus: "open for review",
    previousVersionID: 2,
  },
  accepted: {
    id: 547964732,
    newPostTitle: "Post title",
    projectPostID: 1,
    branchTitle: "Grammar fixes",
    newVersionID: 1,
    reviewIDs: [0, 1, 2],
    anonymous: false,
    createdAt: "19 May 2024",
    collaboratorIDs: [0, 1],
    updatedAt: "20 May 2024",
    updatedCompletionStatus: "ideation",
    updatedScientificFields: ["Mathematics"],
    branchReviewStatus: "peer reviewed",
    previousVersionID: 2,
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

export const dummyVersion = {
  id: 1,
  discussionIDs: [1, 2, 3, 4],
};

export const dummyReview: { rejected: ReviewT; accepted: ReviewT } = {
  rejected: {
    id: 1,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. \n\n Sed cursus ante nulla, sed laoreet nisl sagittis eget. Donec tempus mi ut nulla cursus pellentesque. Integer rhoncus lectus eu massa facilisis, vel vestibulum lacus porta. Nam sapien diam, commodo vel ante sit amet, laoreet laoreet nisl. Phasellus sit amet elit a nulla laoreet iaculis nec sed mi. Maecenas varius purus leo, vitae mattis urna iaculis eget. Vestibulum non fermentum metus, sed interdum metus. Cras rutrum in lacus ac suscipit. Sed posuere consequat tellus eget malesuada. Aliquam congue neque pharetra risus condimentum, ac placerat dolor interdum. Nulla eu leo a lorem hendrerit condimentum. Suspendisse ultrices, ante at accumsan rutrum, mauris ipsum vulputate nisl, at posuere enim velit vel velit. Curabitur lobortis quis neque pharetra pellentesque. Nulla vehicula diam at neque vehicula pellentesque. Maecenas tristique leo vitae molestie finibus.",
    memberID: 0,
    branchReviewDecision: "rejected",
    branchID: 0,
    createdAt: "02 June 2024",
  },
  accepted: {
    id: 2,
    feedback:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
    memberID: 1,
    branchReviewDecision: "approved",
    branchID: 0,
    createdAt: "02 June 2024",
  },
};
