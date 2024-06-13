export type idT = number;

export type BranchCollaboratorT = {
  id: idT;
  branchID: idT;
  memberID: idT;
};

export type BranchT = {
  id: idT;
  updatedPostTitle: string;
  branchOverallReviewStatus: BranchOverallReviewStatusT;
  branchTitle: string;
  collaboratorIDs: idT[];
  discussionIDs: idT[];
  projectPostID: idT;
  renderStatus: RenderStatusT;
  reviewIDs: idT[];
  updatedCompletionStatus: ProjectCompletionStatusT;
  updatedScientificFields: idT[];
};

export type BranchOverallReviewStatusT =
  | "open for review"
  | "peer reviewed"
  | "rejected";

export type BranchReviewT = {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  createdAt: string;
  feedback: string;
  id: idT;
  memberID: idT;
};

export type BranchReviewDecisionT = "rejected" | "approved";

export type ClosedBranchtT = {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  id: idT;
  projectPostID: idT;
  supercededBranchID: idT;
};

export type CollaborationTypeT = "author" | "contributor" | "reviewer";

export type DiscussionContainerT = {
  discussionIDs: idT[];
  id: idT;
};

export type DiscussionT = {
  id: idT;
  memberID: idT;
  replyIDs: idT[];
  text: string;
};

export type MemberT = {
  scientificFields: string[]; // TODO change to IDs
  email: string;
  firstName: string;
  id: idT;
  institution: string;
  lastName: string;
};

export type PostCollaboratorT = {
  collaborationType: CollaborationTypeT;
  id: idT;
  memberID: idT;
  postID: idT;
};

export type PostT = {
  id: idT;
  collaboratorIDs: idT[];
  discussionIDs: idT[];
  postType: PostTypeT;
  renderStatus: RenderStatusT;
  scientificFields: string[]; // TODO change to IDs
  title: string;
};

export type PostTypeT = "reflection" | "question" | "project";

export type ProjectCompletionStatusT = "idea" | "ongoing" | "completed";

export type ProjectFeedbackPreferenceT =
  | "discussion feedback"
  | "formal feedback";

export type ProjectPostT = {
  closedBranchIDs: idT[];
  id: idT;
  openBranchIDs: idT[];
  postID: idT;
  postReviewStatus: ProjectReviewStatusT;
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
};

export type ProjectReviewStatusT = "open" | "revision needed" | "reviewed";

export type RenderStatusT = "success" | "pending" | "failure"; //TODO

export type ScientificFieldT = {
  // TODO
  id: idT;
  label: string;
};
