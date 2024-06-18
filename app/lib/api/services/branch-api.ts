import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import {
  BranchCreationFormT,
  BranchReviewDecisionT,
  BranchT,
  ClosedBranchT,
  idT,
} from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";
import { fetchPostData } from "./post-api";

/**
 * Fetches branch or closed branch data in a unified object
 * @async
 * @param id branch or closed branch ID
 * @returns branch and optionally closed branch data
 */
export async function fetchBranchData(
  id: idBranchUnionT,
): Promise<BranchUnionT> {
  let closedBranch = undefined;

  if (id.isClosed) {
    const closedBranchResponse = await fetch(
      `${baseUrl}/branches/closed/${id.id}`,
    );
    await validateResponse(closedBranchResponse);
    closedBranch = (await closedBranchResponse.json()) as ClosedBranchT;
  }

  const branchID = closedBranch?.branchID ?? (id.id as idT);
  const branchResponse = await fetch(`${baseUrl}/branches/${branchID}`);
  await validateResponse(branchResponse);

  const branch = (await branchResponse.json()) as BranchT;

  const projectPostID = branch.projectPostID ?? closedBranch?.projectPostID;
  if (!projectPostID) {
    throw new Error(
      `missing some project post ID in ${id.isClosed ? "closed" : ""} branch ${id.id}`,
    );
  }

  const updated = await fetchBranchUpdatedFieldsFallback(branch, projectPostID);

  return { branch, closedBranch, updated, projectPostID, id };
}

/**
 * For each of the possible post fields that a branch updates, returns
 * either the updated data or the current data if updated is null
 * @param branch branch whose update we're interested in
 * @param projectPostID ID of project post that branch is updating
 */
export async function fetchBranchUpdatedFieldsFallback(
  branch: BranchT,
  projectPostID: idT,
) {
  if (
    branch.updatedPostTitle &&
    branch.updatedCompletionStatus &&
    branch.updatedScientificFieldTagContainerID
  ) {
    return {
      postTitle: branch.updatedPostTitle,
      completionStatus: branch.updatedCompletionStatus,
      scientificFieldTagContainerID:
        branch.updatedScientificFieldTagContainerID,
    };
  }

  const postData = await fetchPostData({
    id: projectPostID,
    isProject: true,
  });

  return {
    postTitle: branch.updatedPostTitle ?? postData.post.title,
    completionStatus:
      branch.updatedCompletionStatus ??
      postData.projectPost!.projectCompletionStatus,
    scientificFieldTagContainerID:
      branch.updatedScientificFieldTagContainerID ??
      postData.post.scientificFieldTagContainerID,
  };
}

/**
 * Fetches statuses of all brabch reviews
 * @param id branch ID
 */
export async function fetchBranchReviewStatuses(id: idT) {
  const res = await fetch(`${baseUrl}/branches/${id}/review-statuses`);
  await validateResponse(res);
  return (await res.json()) as BranchReviewDecisionT[];
}

/**
 * Fetches data for all branches and returns them in array sorted by
 * updated date (latest update first)
 * @param ids branch IDs
 * @returns branch data sorted by latest update
 */
export async function fetchOrderedBranches(ids: idBranchUnionT[]) {
  let branches: BranchUnionT[] = [];

  for (const id of ids) {
    const branch = await fetchBranchData(id);
    branches = [...branches, branch];
  }

  return branches.toSorted((a, b) => {
    // Use created at as fallbacke for updated at
    const aDate = new Date(a.branch.updatedAt ?? a.branch.createdAt);
    const bDate = new Date(b.branch.updatedAt ?? b.branch.createdAt);

    // Sorts by latest update first
    const aIsEarlier = aDate.getTime() < bDate.getTime();
    return aIsEarlier ? 1 : -1;
  });
}

/**
 * Endpoint for creating a new branch object
 * @async
 * @param branchCreationForm object containing branch creation form data
 * @returns the newly created branch object
 */
export async function postBranches(
  branchCreationForm: BranchCreationFormT,
): Promise<BranchT> {
  const jsonPost = JSON.stringify(branchCreationForm);
  const response = await fetch(`${baseUrl}/branches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPost,
  });
  await validateResponse(response);
  const branch = (await response.json()) as BranchT;
  return branch;
}

/**
 * Method that sends a POST request to the server to upload a file to an existing branch
 * @async
 * @param branchId the branch we want to upload the file to
 * @param file the file we want to upload
 * @returns whether the request retuned a 200OK response
 */
export async function postBranchesIdUpload(
  branchId: idT,
  file: File,
): Promise<boolean> {
  const fileData = new FormData();
  fileData.append("file", file);

  const response = await fetch(baseUrl + "/branches/" + branchId + "/upload", {
    method: "POST",
    body: fileData,
  });
  await validateResponse(response);
  return response.ok;
}
