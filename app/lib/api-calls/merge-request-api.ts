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
      id: id,
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
      id: id,
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

  // Accepted
  return {
    id: id,
    title: "Expand literature review",
    version: "1",
    reviews: ["1", "2", "3"],
    anonymous: false,
    createdAt: "19 May 2024",
    collaborators: ["1", "2"],
    updatedCompletionStatus: "Ideation",
    updatedScientificTags: ["Mathematics"],
    mergeRequestStatus: "accepted",
    versionWhenClosed: "2",
    closedAt: "20 May 2024",
  };
}

/**
 * Gets merge requests of a post given their ID.
 *
 * @async
 * @param id Post ID
 */
export async function getPostMergeRequests(id: string) {
  return { rejected: ["1"], open: ["2"], accepted: ["4", "3"] };
}
