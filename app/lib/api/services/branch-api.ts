import { BranchUnionT, idBranchUnionT } from "@/lib/types/branch-union";
import { BranchT, ClosedBranchtT, idT } from "../../types/api-types";
import { baseUrl, validateResponse } from "../api-common";

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
    closedBranch = (await closedBranchResponse.json()) as ClosedBranchtT;
  }

  const branchID = closedBranch?.branchID ?? (id.id as idT);
  const branchResponse = await fetch(`${baseUrl}/branches/${branchID}`);
  await validateResponse(branchResponse);

  // This additional variable and following check is needed due to a bug in
  // the backend that returns a property in PascalCase instead of camelCase
  // if that bug is fixed, change the lines up to the return statement to
  // const branch = (await branchResponse.json()) as BranchT;

  const branchResponseJson = (await branchResponse.json()) as BranchT & {
    UpdatedPostTitle: string | undefined;
  };
  const branch: BranchT = {
    ...branchResponseJson,
    updatedPostTitle:
      branchResponseJson.updatedPostTitle ??
      branchResponseJson.UpdatedPostTitle,
  };

  return { branch, closedBranch };
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
