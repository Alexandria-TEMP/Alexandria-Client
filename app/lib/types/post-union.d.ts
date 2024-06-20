import { PostT, ProjectPostT } from "./api-types";

export type PostUnionT = {
  post: PostT;
  projectPost?: ProjectPostT;
  id: idPostUnionT;
};

export type idPostUnionT = {
  id: idT;
  isProject: boolean;
};
