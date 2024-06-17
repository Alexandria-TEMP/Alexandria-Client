import { BranchT, ClosedBranchtT } from "./api-types";

export type BranchUnionT = {
  branch: BranchT;
  closedBranch?: ClosedBranchtT;
};

export type idBranchUnionT = {
  id: idT;
  isClosed: boolean;
};
