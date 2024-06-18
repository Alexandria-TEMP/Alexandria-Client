import { BranchT, ClosedBranchT } from "./api-types";

export type BranchUnionT = {
  branch: BranchT;
  closedBranch?: ClosedBranchT;
  updated: BranchUpdatedFieldsT;
  projectPostID: idT;
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
