/**
 * Gets data for a Merge request given their ID.
 *
 * @async
 * @param id Merge request ID
 */
export async function getMergeRequestData(id: string) {
  // TODO
  if (id == "1") {
    // Rejected
    return {
      title: "Remove contents section",
      version: "1",
      reviews: ["1", "2", "3"],
      anonymous: false,
      createdAt: "19 May 2024",
      collaborators: ["1", "2"],
      updatedCompletionStatus: "Ideation",
      updatedScientificTags: ["Mathematics"],
      mergeRequestStatus: "rejected",
      versionWhenClosed: "2",
      closedAt: "20 May 2024",
    };
  }

  if (id == "2") {
    // Open
    return {
      title: "Add new experiment",
      version: "1",
      reviews: ["1", "2"],
      anonymous: false,
      createdAt: "19 May 2024",
      collaborators: ["1", "2"],
      updatedCompletionStatus: "Ideation",
      updatedScientificTags: ["Mathematics"],
      mergeRequestStatus: "open",
      versionWhenClosed: "2",
      closedAt: "20 May 2024",
    };
  }

  // Approved
  return {
    title: "Expand literature review",
    version: "1",
    reviews: ["1", "2", "3"],
    anonymous: false,
    createdAt: "19 May 2024",
    collaborators: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificTags: ["Mathematics"],
    mergeRequestStatus: "approved",
    versionWhenClosed: "2",
    closedAt: "20 May 2024",
  };
}

/**
 * Gets open merge requests of a post given their ID.
 *
 * @async
 * @param id Post ID
 */
export async function getPostOpenMergeRequests(id: string) {
  return ["1", "2", "3"];
}

/**
 * Gets closed merge requests of a post given their ID.
 *
 * @async
 * @param id Post ID
 */
export async function getPostClosedMergeRequests(id: string) {
  return ["1", "2", "3"];
}
