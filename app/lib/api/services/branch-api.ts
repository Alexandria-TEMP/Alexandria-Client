import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import { BranchT, idT } from "../../types/api-types";

/**
 * Gets data for a branch given their ID.
 * @async
 * @param id branch ID
 */
export async function fetchBranchData(
  id: idBranchUnionT,
): Promise<BranchUnionT> {
  // TODO handle UpdatedPostTitle (note wrong case) by throwing error etc

  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    id,
    updatedPostTitle: "",
    branchOverallReviewStatus: "open for review",
    branchTitle: "",
    collaboratorIDs: [],
    discussionIDs: [],
    renderStatus: "failure",
    projectPostID: 1,
    reviewIDs: [],
    updatedCompletionStatus: "idea",
    updatedScientificFields: [],
  };
}

/**
 * Gets branches of a post given their ID.
 * @async
 * @param id Post ID
 */
// TODO remove next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPostBranches(id: idT) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  // TODO
  return {
    rejected: [1],
    open: [2],
    accepted: [3],
  };
}

/**
 * TODO jsdoc when properly implemented
 */
// TODO remove next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getBranchReviewStatuses(id: idT) {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 70));
  return [];
  // if (id == 1) return ["accept", "reject", "accept"];
  // else if (id == 2) return ["accept", "open", "open"];
  // else return ["accept", "accept", "accept"];
}
