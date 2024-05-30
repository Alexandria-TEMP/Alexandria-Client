import { MergeRequest } from "../api-types";

/**
 * Gets data for a Merge request given their ID.
 *
 * @async
 * @param id Merge request ID
 */
export async function getMergeRequestData(id: string): Promise<MergeRequest> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 800));
  if (id == "1") {
    // Rejected
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: "1",
      mergeRequestTitle: "Remove contents section",
      newVersionID: "1",
      reviewIDs: ["accept", "reject", "accept"],
      anonymous: false,
      createdAt: new Date(2024, 4, 19),
      collaboratorIDs: ["1", "2"],
      updatedCompletionStatus: "Ideation",
      updatedScientificFields: ["Mathematics"],
      status: "rejected",
      previousVersionID: "2",
      closedAt: new Date(2024, 4, 20),
    };
  }

  if (id == "2") {
    // Open
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: "1",
      mergeRequestTitle: "Add new experiment",
      newVersionID: "1",
      reviewIDs: ["accept", "accept"],
      anonymous: false,
      createdAt: new Date(2024, 4, 19),
      collaboratorIDs: ["1", "2"],
      updatedCompletionStatus: "Ideation",
      updatedScientificFields: ["Mathematics"],
      status: "open",
      previousVersionID: "2",
      closedAt: new Date(2024, 4, 20),
    };
  }

  if (id == "3") {
    // Open
    return {
      id: id,
      newPostTitle: "Post title",
      projectPostID: "1",
      mergeRequestTitle: "Grammar fixes",
      newVersionID: "1",
      reviewIDs: ["accept"],
      anonymous: false,
      createdAt: new Date(2024, 4, 19),
      collaboratorIDs: ["1", "2"],
      updatedCompletionStatus: "Ideation",
      updatedScientificFields: ["Mathematics"],
      status: "open",
      previousVersionID: "2",
      closedAt: new Date(2024, 4, 20),
    };
  }

  // Accepted
  return {
    id: id,
    newPostTitle: "Post title",
    projectPostID: "1",
    mergeRequestTitle: "Expand literature review",
    newVersionID: "1",
    reviewIDs: ["accept", "accept", "accept"],
    anonymous: false,
    createdAt: new Date(2024, 4, 19),
    collaboratorIDs: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificFields: ["Mathematics"],
    status: "accepted",
    previousVersionID: "2",
    closedAt: new Date(2024, 4, 20),
  };
}

/**
 * Gets merge requests of a post given their ID.
 *
 * @async
 * @param id Post ID
 */
// TODO remove next line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getPostMergeRequests(id: string) {
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
