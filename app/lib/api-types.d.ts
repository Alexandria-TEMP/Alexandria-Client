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
  version: string;
};

export type PostType = "Reflection" | "Question" | "Project";
