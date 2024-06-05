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

export type PostType = "Reflection" | "Question" | "Project";
