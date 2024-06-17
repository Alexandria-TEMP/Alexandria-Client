import { BranchT, idT } from "../../types/api-types";
import { baseUrl } from "../api-common";
import { validateResponse } from "../api-common";

/**
 * Gets data for a branch given their ID.
 * @async
 * @param id branch ID
 */
export async function getBranchData(id: idT): Promise<BranchT> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    id,
    updatedPostTitle: "",
    branchOverallReviewStatus: "open for review",
    branchTitle: "",
    collaboratorIDs: [],
    discussionContainerID: 1,
    renderStatus: "failure",
    projectPostID: 1,
    reviewIDs: [],
    updatedCompletionStatus: "idea",
    updatedScientificFieldTagContainerID: 1,
    updatedAt: "",
    createdAt: "",
  };
  // if (id == 1)
  //   return {
  //     id: id,
  //     updatedPostTitle: "Post title",
  //     projectPostID: 1,
  //     branchTitle: "Remove contents section",
  //     reviewIDs: [3, 1, 2],
  //     collaboratorIDs: [0, 1],
  //     updatedCompletionStatus: "idea",
  //     updatedScientificFields: [1],
  //     branchOverallReviewStatus: "rejected",
  //   };
  // else if (id == 2)
  //   return {
  //     id: id,
  //     updatedPostTitle: "Post title",
  //     projectPostID: 1,
  //     branchTitle: "Do some stuff",
  //     newVersionID: 1,
  //     reviewIDs: [3, 2],
  //     anonymous: false,
  //     createdAt: "19 May 2024",
  //     collaboratorIDs: [0, 1],
  //     updatedAt: "20 May 2024",
  //     updatedCompletionStatus: "idea",
  //     updatedScientificFields: [1],
  //     branchOverallReviewStatus: "open for review",
  //     previousVersionID: 2,
  //   };
  // else
  //   return {
  //     id: id,
  //     updatedPostTitle: "Post title",
  //     projectPostID: 1,
  //     branchTitle: "Grammar fixes",
  //     newVersionID: 1,
  //     reviewIDs: [2, 4, 3],
  //     anonymous: false,
  //     createdAt: "19 May 2024",
  //     collaboratorIDs: [0, 1],
  //     updatedAt: "20 May 2024",
  //     updatedCompletionStatus: "idea",
  //     updatedScientificFields: [1],
  //     branchOverallReviewStatus: "peer reviewed",
  //     previousVersionID: 2,
  //   };
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

/**
 * Method that sends a POST request to the server to upload a file to an existing branch
 * @async
 * @param branchId the branch we want to upload the file to
 * @param file the file we want to upload
 * @returns whether the request retuned a 200OK response
 */
export async function postBranchesIdUpload(branchId: idT, file: File) {
  const fileData = new FormData();
  fileData.append("file", file);

  const response = await fetch(baseUrl + "/branches/" + branchId + "/upload", {
    method: "POST",
    body: fileData,
  });
  await validateResponse(response);
  return response.ok;
}
