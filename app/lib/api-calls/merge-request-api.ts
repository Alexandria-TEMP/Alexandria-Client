import { MergeRequest, idType } from "../types/api-types";

/**
 * Gets data for a Merge request given their ID.
 * @async
 * @param id Merge request ID
 */
export async function getMergeRequestData(id: idType): Promise<MergeRequest> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (id == 1)
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      mergeRequestTitle: "Remove contents section",
      newVersionID: 1,
      reviewIDs: [0, 1, 0],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      mergeRequestDecision: "rejected",
      previousVersionID: 2,
    };
  else if (id == 2)
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      mergeRequestTitle: "Do some stuff",
      newVersionID: 1,
      reviewIDs: [1],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      mergeRequestDecision: "open for review",
      previousVersionID: 2,
    };
  else
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: 1,
      mergeRequestTitle: "Grammar fixes",
      newVersionID: 1,
      reviewIDs: [1, 1, 1],
      anonymous: false,
      createdAt: "19 May 2024",
      collaboratorIDs: [0, 1],
      updatedAt: "20 May 2024",
      updatedCompletionStatus: "ideation",
      updatedScientificFields: ["Mathematics"],
      mergeRequestDecision: "peer reviewed",
      previousVersionID: 2,
    };
}

/**
 * Gets merge requests of a post given their ID.
 * @async
 * @param id Post ID
 */
// TODO remove next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPostMergeRequests(id: idType) {
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

export async function getMergeRequestReviewStatuses(id: idType) {
  await new Promise((resolve) => setTimeout(resolve, 70));
  if (id == 1) return ["accept", "reject", "accept"];
  else if (id == 2) return ["accept", "open", "open"];
  else return ["accept", "accept", "accept"];
}
