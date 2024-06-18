import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import {
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

  return { branch, closedBranch, updated, projectPostID };
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
 * Fetches statuses of all brach reviews
 * @param id branch ID
 */
export async function fetchBranchReviewStatuses(id: idT) {
  const res = await fetch(`${baseUrl}/branches/${id}/review-statuses`);
  await validateResponse(res);
  return (await res.json()) as BranchReviewDecisionT[];
}
