export type idType = number;

export type BranchCollaboratorT = {
  id: idType;
  branchID: idType;
  memberID: idType;
};

export type BranchT = {
  id: idType;
  updatedPostTitle: string;
  branchOverallReviewStatus: BranchOverallReviewStatusT;
  branchTitle: string;
  collaboratorIDs: idType[];
  discussionIDs: idType[];
  projectPostID: idType;
  renderStatus: RenderStatusT;
  reviewIDs: idType[];
  updatedCompletionStatus: ProjectCompletionStatusT;
  updatedScientificFields: idType[];
};

export type BranchOverallReviewStatusT =
  | "open for review"
  | "peer reviewed"
  | "rejected";

export type BranchReviewT = {
  branchID: idType;
  branchReviewDecision: BranchReviewDecisionT;
  createdAt: string;
  feedback: string;
  id: idType;
  memberID: idType;
};

export type BranchReviewDecisionT = "rejected" | "approved";

export type ClosedBranchtT = {
  branchID: idType;
  branchReviewDecision: BranchReviewDecisionT;
  id: idType;
  projectPostID: idType;
  supercededBranchID: idType;
};

export type CollaborationTypeT = "author" | "contributor" | "reviewer";

export type DiscussionContainerT = {
  discussionIDs: idType[];
  id: idType;
};

export type DiscussionT = {
  id: idType;
  memberID: idType;
  replyIDs: idType[];
  text: string;
};

export type MemberT = {
  ScientificFields: string[]; //TODO this will have to change to ids
  id: idType;
  email: string;
  firstName: string;
  picture: string; //TODO this should be gone
  institution: string;
  lastName: string;
  password: string;
};

export type PostCollaboratorT = {
  collaborationType: string;
  id: idType;
  memberID: idType;
  postID: idType;
};

export type PostT = {
  id: idType;
  collaboratorIDs: idType[]; // TODO duplicates will be fixed in issue #27
  discussionIDs: idType[];
  title: string;
  status: string;
  authors: string[];
  contributors: string[];
  anonymous: boolean;
  createdAt: string;
  currentVersion: VersionT;
  postType: string;
  scientificFieldTags: string[];
  updatedAt: string;
  feedbackPreferences: string;
  completionStatus: string;
};

export type Tag = {
  id: string;
  tag: string;
  tagType: string;
};

export type VersionT = {
  id: string;
  discussions: string[];
};

// TODO decide on if keep this
export type PostType = "Reflection" | "Question" | "Project";

export type RenderStatusT = ""; //TODO
