import { BranchT, ClosedBranchtT } from "./api-types";

export type BranchUnionT = {
  branch: BranchT;
  closedBranch?: ClosedBranchtT;
  updated: BranchUpdatedFieldsT;
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
