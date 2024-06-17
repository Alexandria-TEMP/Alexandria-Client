// Globals

export type idT = number;

// Enums

export type BranchOverallReviewStatusT =
  | "open for review"
  | "peer reviewed"
  | "rejected";

export type BranchReviewDecisionT = "rejected" | "approved";

export type CollaborationTypeT = "author" | "contributor" | "reviewer";

export type PostTypeT = "reflection" | "question" | "project";

export type ProjectCompletionStatusT = "idea" | "ongoing" | "completed";

export type ProjectFeedbackPreferenceT =
  | "discussion feedback"
  | "formal feedback";

export type ProjectReviewStatusT = "open" | "revision needed" | "reviewed";

export type RenderStatusT = "success" | "pending" | "failure";

// Entities

export type EntityT = { id: idT };

export type BranchCollaboratorT = EntityT & {
  branchID: idT;
  memberID: idT;
};

export type BranchT = EntityT & {
  updatedPostTitle: string | null;
  branchOverallReviewStatus: BranchOverallReviewStatusT;
  branchTitle: string;
  collaboratorIDs: idT[];
  discussionContainerID: idT;
  projectPostID: idT;
  renderStatus: RenderStatusT;
  reviewIDs: idT[];
  updatedAt: string;
  createdAt: string;
  updatedCompletionStatus: ProjectCompletionStatusT | null;
  updatedScientificFieldTagContainerID: idT | null;
};

export type BranchReviewT = EntityT & {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  createdAt: string;
  feedback: string;
  memberID: idT;
};

export type ClosedBranchtT = EntityT & {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  projectPostID: idT;
  supercededBranchID: idT;
};

export type DiscussionContainerT = EntityT & {
  discussionIDs: idT[];
};

export type DiscussionT = EntityT & {
  memberID: idT;
  replyIDs: idT[];
  text: string;
};

export type MemberT = EntityT & {
  scientificFieldTagContainerID: idT;
  email: string;
  firstName: string;
  institution: string;
  lastName: string;
};

export type PostCollaboratorT = EntityT & {
  collaborationType: CollaborationTypeT;
  memberID: idT;
  postID: idT;
};

export type PostT = EntityT & {
  collaboratorIDs: idT[];
  discussionContainerID: idT;
  createdAt: string;
  postType: PostTypeT;
  renderStatus: RenderStatusT;
  scientificFieldTagContainerID: idT;
  title: string;
  updatedAt: string;
};

export type ProjectPostT = EntityT & {
  closedBranchIDs: idT[];
  openBranchIDs: idT[];
  postID: idT;
  postReviewStatus: ProjectReviewStatusT;
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
};

export type ScientificFieldTagT = EntityT & {
  parentID?: idT;
  scientificField: string;
  subtagIDs: idT[];
};

export type ScientificFieldTagContainerT = EntityT & {
  scientificFieldTagIDs: idT[];
};
