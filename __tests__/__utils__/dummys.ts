import {
  PostT,
  BranchReviewT,
  MemberT,
  ScientificFieldTagT,
  DiscussionContainerT,
  ProjectPostT,
} from "@/lib/types/api-types";
import { BranchUnionT } from "@/lib/types/branch-union";
import { FileTreeT } from "@/lib/types/file-tree";
import { PostUnionT } from "@/lib/types/post-union";

export const dummyDiscussion = {
  id: "4321",
  anonymous: false,
  author: {
    email: "mariecurie@tudelft.nl",
    firstName: "Marie",
    institution: "TU Delft",
    lastName: "Curie",
  },
  createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
  deleted: false,
  deletedAt: "-",
  replyIDs: [],
  text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut ducimus amet ex qui eius corrupti reiciendis, quibusdam suscipit, aspernatur ipsum. Reprehenderit libero molestias nostrum eum sed? Illo, quidem ad.",
  updatedAt: "date", // Must be invalid date to avoid locale differences in snapshot
};

export const dummyMembers: MemberT[] = [
  {
    id: 413256,
    email: "mariecurie@tudelft.nl",
    firstName: "Marie",
    institution: "TU Delft",
    lastName: "Curie",
    scientificFieldTagContainerID: 1,
  },
  {
    id: 2,
    email: "kopernicus@tudelft.nl",
    firstName: "Nicolaus",
    institution: "TU Delft",
    lastName: "Copernicus",
    scientificFieldTagContainerID: 1,
  },
];

export const dummyPost: PostT = {
  title: "Post title",
  renderStatus: "success",
  collaboratorIDs: [1, 2],
  discussionContainerID: 1,
  id: 1,
  postType: "reflection",
  scientificFieldTagContainerID: 1,
  createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
  updatedAt: "date", // Must be invalid date to avoid locale differences in snapshot
};

export const dummyProjectPost: ProjectPostT = {
  id: 1,
  closedBranchIDs: [13],
  openBranchIDs: [7],
  postID: dummyPost.id,
  postReviewStatus: "reviewed",
  projectCompletionStatus: "completed",
  projectFeedbackPreference: "formal feedback",
};

export const dummyPostUnion: {
  withProject: PostUnionT;
  noProject: PostUnionT;
} = {
  withProject: {
    post: { ...dummyPost, postType: "project" },
    projectPost: dummyProjectPost,
    id: { id: 1, isProject: true },
  },
  noProject: { post: dummyPost, id: { id: 1, isProject: false } },
};

export const dummyScientificFields: ScientificFieldTagT[] = [
  {
    id: 1,
    scientificField: "Computer Science",
    parentID: 1,
    subtagIDs: [],
  },
  {
    id: 2,
    scientificField: "Computer Science",
    parentID: 1,
    subtagIDs: [],
  },
  {
    id: 3,
    scientificField: "Computer Science",
    parentID: 1,
    subtagIDs: [],
  },
];

export const dummyBranches: {
  rejected: BranchUnionT;
  accepted: BranchUnionT;
  open: BranchUnionT;
} = {
  rejected: {
    branch: {
      id: 2,
      updatedAt: "date", // Must be invalid date to avoid locale differences in snapshot
      createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
      updatedCompletionStatus: null,
      updatedPostTitle: null,
      updatedScientificFieldTagContainerID: null,
      branchOverallReviewStatus: "rejected",
      projectPostID: null,
      collaboratorIDs: [1],
      renderStatus: "success",
      branchTitle: "Something",
      discussionContainerID: 1,
      reviewIDs: [1, 2, 3],
    },
    closedBranch: {
      id: 1,
      branchID: 2,
      branchReviewDecision: "rejected",
      projectPostID: 1,
      supercededBranchID: 1,
    },
    updated: {
      postTitle: "New title",
      completionStatus: "ongoing",
      scientificFieldTagContainerID: 1,
    },
    id: {
      id: 1,
      isClosed: true,
    },
    postIDs: { projectPostID: 1, postID: 1 },
  },
  accepted: {
    branch: {
      id: 3,
      updatedAt: "date", // Must be invalid date to avoid locale differences in snapshot
      createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
      updatedCompletionStatus: null,
      updatedPostTitle: null,
      updatedScientificFieldTagContainerID: null,
      branchOverallReviewStatus: "peer reviewed",
      projectPostID: null,
      collaboratorIDs: [1],
      renderStatus: "success",
      branchTitle: "Something",
      discussionContainerID: 1,
      reviewIDs: [4, 2, 3],
    },
    closedBranch: {
      id: 2,
      branchID: 3,
      branchReviewDecision: "approved",
      projectPostID: 1,
      supercededBranchID: 1,
    },
    updated: {
      postTitle: "New title",
      completionStatus: "ongoing",
      scientificFieldTagContainerID: 1,
    },
    id: {
      id: 2,
      isClosed: true,
    },
    postIDs: { projectPostID: 1, postID: 1 },
  },
  open: {
    branch: {
      id: 4,
      updatedAt: "date", // Must be invalid date to avoid locale differences in snapshot
      createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
      updatedCompletionStatus: null,
      updatedPostTitle: null,
      updatedScientificFieldTagContainerID: null,
      branchOverallReviewStatus: "open for review",
      projectPostID: 1,
      collaboratorIDs: [1],
      renderStatus: "success",
      branchTitle: "Something",
      discussionContainerID: 1,
      reviewIDs: [5],
    },
    closedBranch: undefined,
    updated: {
      postTitle: "New title",
      completionStatus: "ongoing",
      scientificFieldTagContainerID: 1,
    },
    id: {
      id: 4,
      isClosed: false,
    },
    postIDs: { projectPostID: 1, postID: 1 },
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

export const dummyDiscussionContainer: DiscussionContainerT = {
  id: 1,
  discussionIDs: [1, 2, 3, 4],
};

export const dummyReview: { rejected: BranchReviewT; accepted: BranchReviewT } =
  {
    rejected: {
      id: 1,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. \n\n Sed cursus ante nulla, sed laoreet nisl sagittis eget. Donec tempus mi ut nulla cursus pellentesque. Integer rhoncus lectus eu massa facilisis, vel vestibulum lacus porta. Nam sapien diam, commodo vel ante sit amet, laoreet laoreet nisl. Phasellus sit amet elit a nulla laoreet iaculis nec sed mi. Maecenas varius purus leo, vitae mattis urna iaculis eget. Vestibulum non fermentum metus, sed interdum metus. Cras rutrum in lacus ac suscipit. Sed posuere consequat tellus eget malesuada. Aliquam congue neque pharetra risus condimentum, ac placerat dolor interdum. Nulla eu leo a lorem hendrerit condimentum. Suspendisse ultrices, ante at accumsan rutrum, mauris ipsum vulputate nisl, at posuere enim velit vel velit. Curabitur lobortis quis neque pharetra pellentesque. Nulla vehicula diam at neque vehicula pellentesque. Maecenas tristique leo vitae molestie finibus.",
      memberID: 0,
      branchReviewDecision: "rejected",
      branchID: 0,
      createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
    },
    accepted: {
      id: 2,
      feedback:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In in felis et nibh commodo suscipit aliquam et tellus. Integer mattis mauris vitae sem laoreet vulputate. Maecenas iaculis lacus at convallis bibendum. Nunc porttitor auctor aliquam. Aliquam erat volutpat. Morbi dictum scelerisque mattis. Sed vel dolor lorem. Sed posuere, risus nec tincidunt ultricies, augue libero porta nibh, in venenatis elit risus vel ante. Maecenas placerat nisl non lacus viverra lobortis. Fusce pharetra finibus nisl. Sed sit amet ultrices massa. Proin molestie tincidunt sapien, ut aliquam felis fermentum vel. Interdum et malesuada fames ac ante ipsum primis in faucibus.",
      memberID: 1,
      branchReviewDecision: "approved",
      branchID: 0,
      createdAt: "date", // Must be invalid date to avoid locale differences in snapshot
    },
  };

export const dummyFileTree: FileTreeT = {
  a: {
    b: {
      "c.txt": 5,
    },
    "file.txt": 8235000,
  },
  "rootfile.txt": 86,
  dir: {
    "f.txt": 2430,
  },
};

export const dummyFile: File = new File([], "filename");
