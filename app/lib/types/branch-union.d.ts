import { BranchT, ClosedBranchT } from "./api-types";

export type BranchUnionT = {
  branch: BranchT;
  closedBranch?: ClosedBranchT;
  updated: BranchUpdatedFieldsT;
  postIDs: { projectPostID: idT; postID: idT };
  id: idBranchUnionT;
};

export type idBranchUnionT = {
  id: idT;
  isClosed: boolean;
};

export type BranchUpdatedFieldsT = {
  postTitle: string;
  completionStatus: ProjectCompletionStatusT;
  scientificFieldTagContainerID: idT;
};
