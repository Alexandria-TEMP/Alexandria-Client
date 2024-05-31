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
  collaboratorIDs: string[];
  id: string;
  mergeRequestTitle: string;
  newPostTitle: string;
  newVersionID: string;
  previousVersionID: string;
  projectPostID: string;
  createdAt: Date;
  closedAt: Date;
  reviewIDs: string[];
  updatedCompletionStatus: string;
  updatedScientificFields: string[];
  status: string;
};

export type PostType = "Reflection" | "Question" | "Project";
