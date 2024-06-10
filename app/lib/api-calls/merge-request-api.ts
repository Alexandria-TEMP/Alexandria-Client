import { BranchT, idType } from "../types/api-types";

/**
 * Gets data for a branch given their ID.
 * @async
 * @param id branch ID
 */
export async function getBranchData(id: idType): Promise<BranchT> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (id == 1)
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      branchTitle: "Remove contents section",
      newVersionID: 1,
      reviewIDs: [3, 1, 2],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      branchReviewStatus: "rejected",
      previousVersionID: 2,
    };
  else if (id == 2)
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      branchTitle: "Do some stuff",
      newVersionID: 1,
      reviewIDs: [3, 2],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      branchReviewStatus: "open for review",
      previousVersionID: 2,
    };
  else
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      branchTitle: "Grammar fixes",
      newVersionID: 1,
      reviewIDs: [2, 4, 3],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      branchReviewStatus: "peer reviewed",
      previousVersionID: 2,
    };
}

/**
 * Gets branches of a post given their ID.
 * @async
 * @param id Post ID
 */
// TODO remove next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPostBranches(id: idType) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    rejected: ["1", "1", "1", "1"],
    open: ["2", "3", "3"],
    accepted: [
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
      "4",
    ],
  };
}

/**
 * TODO jsdoc when properly implemented
 */
export async function getBranchReviewStatuses(id: idType) {
  await new Promise((resolve) => setTimeout(resolve, 70));
  if (id == 1) return ["accept", "reject", "accept"];
  else if (id == 2) return ["accept", "open", "open"];
  else return ["accept", "accept", "accept"];
}
