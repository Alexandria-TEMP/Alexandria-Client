import { PostT, ProjectPostT } from "./api-types";

export type PostUnionT = {
  post: PostT;
  projectPost?: ProjectPostT;
};

export type idPostUnionT = {
  id: idT;
  isProject: boolean;
};
