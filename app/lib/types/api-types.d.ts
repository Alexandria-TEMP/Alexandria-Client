export type idType = number;

export type Member = {
  id: string;
  email: string;
  firstName: string;
  picture: string;
  institution: string;
  lastName: string;
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

export type PostT = {
  id: string;
  title: string;
  status: string;
  authors: string[];
  contributors: string[];
  collaborators: string[]; // TODO duplicates will be fixed in issue #27
  anonymous: boolean;
  createdAt: string;
  currentVersion: VersionT;
  postType: string;
  scientificFieldTags: string[];
  updatedAt: string;
  feedbackPreferences: string;
  completionStatus: string;
};

export type BranchT = {
  branchReviewStatus: BranchReviewStatusT;
  branchTitle: string;
  collaboratorIDs: idType[];
  id: idType;
  createdAt: string;
  newPostTitle: string;
  newVersionID: idType;
  previousVersionID: idType;
  projectPostID: idType;
  reviewIDs: idType[];
  updatedAt: string;
  updatedCompletionStatus: string;
  updatedScientificFields: string[];
};

export type ReviewT = {
  branchID: idType;
  branchReviewDecision: BranchReviewDecisionT;
  createdAt: string;
  feedback: string;
  id: idType;
  memberID: idType;
};

export type BranchReviewDecisionT = "rejected" | "approved";

export type BranchReviewStatusT =
  | "open for review"
  | "peer reviewed"
  | "rejected";

// TODO decide on if keep this
export type PostType = "Reflection" | "Question" | "Project";
