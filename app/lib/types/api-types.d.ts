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

export type Post = {
  title: string;
  status: string;
  collaborators: string[];
  createdAt: Date;
  currentVersion: {
    id: string;
    discussions: string[];
  };
  id: string;
  postType: PostType;
  scientificFieldTags: string[];
  updatedAt: Date;
};

export type MergeRequest = {
  anonymous: boolean;
  collaboratorIDs: idType[];
  createdAt: string;
  id: idType;
  mergeRequestDecision: MergeRequestReviewStatus;
  mergeRequestTitle: string;
  newPostTitle: string;
  newVersionID: idType;
  previousVersionID: idType;
  projectPostID: idType;
  reviewIDs: idType[];
  updatedAt: string;
  updatedCompletionStatus: string;
  updatedScientificFields: string[];
};

export type Review = {
  feedback: string;
  id: idType;
  memberID: idType;
  mergeRequestDecision: ReviewDecision;
  mergeRequestID: idType;
  createdAt: string;
};

export type ReviewDecision = "rejected" | "approved";

export type MergeRequestReviewStatus =
  | "open for review"
  | "peer reviewed"
  | "rejected";

// TODO decide on if keep this
export type PostType = "Reflection" | "Question" | "Project";
