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
  updatedPostTitle: string | null; // Null when this field is not updated
  branchOverallReviewStatus: BranchOverallReviewStatusT;
  branchTitle: string;
  collaboratorIDs: idT[];
  discussionContainerID: idT;
  projectPostID: idT | null; // Becomes null and goes to ClosedBranchT once it is closed
  renderStatus: RenderStatusT;
  reviewIDs: idT[];
  updatedAt: string;
  createdAt: string;
  updatedCompletionStatus: ProjectCompletionStatusT | null; // Null when this field is not updated
  updatedScientificFieldTagContainerID: idT | null; // Null when this field is not updated
};

export type BranchReviewT = EntityT & {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  createdAt: string;
  feedback: string;
  memberID: idT;
};

export type ClosedBranchT = EntityT & {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  projectPostID: idT;
  supercededBranchID: idT | null; // Null when this branch was the initial peer review
};

export type DiscussionContainerT = EntityT & {
  discussionIDs: idT[];
};

export type DiscussionT = EntityT & {
  memberID: idT;
  replyIDs: idT[];
  text: string;
  createdAt: string;
};

export type MemberT = EntityT & {
  scientificFieldTagContainerID: idT;
  email: string;
  firstName: string;
  institution: string;
  lastName: string;
};

export type TokensT = {
  accessExp: number;
  accessToken: string;
  refreshExp: number;
  refreshToken: string;
};

export type TokensWithMemberT = TokensT & {
  member: MemberT;
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

// Forms

export type PostCreationFormT = {
  anonymous: boolean;
  authorMemberIDs: idT[];
  postType: PostTypeT;
  scientificFieldTagIDs: idT[];
  title: string;
};

export type ProjectPostCreationFormT = PostCreationFormT & {
  projectCompletionStatus: ProjectCompletionStatusT;
  projectFeedbackPreference: ProjectFeedbackPreferenceT;
};

export type BranchCreationFormT = {
  anonymous: boolean;
  branchTitle: string;
  collaboratingMemberIDs: idT[];
  projectPostID: idT;
  updatedCompletionStatus: ProjectCompletionStatusT;
  updatedFeedbackPreferences: ProjectFeedbackPreferenceT;
  updatedPostTitle: string;
  updatedScientificFieldIDs: idT[];
};

export type MemberCreationFormtT = {
  email: string;
  firstName: string;
  institution: string;
  lastName: string;
  password: string;
  scientificFieldTagIDs: idT[];
};

export type MemberLoginFormT = {
  email: string;
  password: string;
};

type DiscussionCreationFormT = {
  anonymous: boolean;
  text: string;
};

export type RootDiscussionCreationFormT = {
  containerID: idT;
  discussion: DiscussionCreationFormT;
};

export type ReplyDiscussionCreationFormtT = {
  parentID: idT;
  discussion: DiscussionCreationFormT;
};

export type ReviewCreationFormT = {
  branchID: idT;
  branchReviewDecision: BranchReviewDecisionT;
  feedback: string;
};
