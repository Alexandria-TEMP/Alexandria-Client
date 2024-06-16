import { idBranchUnionT } from "./types/branch-union";
import { idPostUnionT } from "./types/post-union";

/**
 * Converts an ID from website's URL to an object for ease of internal use
 * Needed to differentiate between project and regular posts
 * @param pathID ID in URL
 * @returns
 *    id - actual database ID
 *    isProject - indicates if the ID refers to project post
 */
export function pathIDToPostUnionID(pathID: string): idPostUnionT {
  const split = pathID.split("-");
  const id = +split[1];
  const type = split[0];

  if (isNaN(id) || (type != "p" && type != "r"))
    throw new Error(`invalid path id ${pathID} for post`);

  return { id, isProject: type == "p" };
}

/**
 * Converts object used to track regular and project post IDs into
 * string that would appear in website URL
 * @param id.id actual database ID
 * @param id.isProject indicates if the ID refers to project post
 * @returns ID for URL
 */
export function postUnionIDToPathID(id: idPostUnionT): string {
  const type = id.isProject ? "p" : "r";
  return `${type}-${id.id}`;
}

/**
 * Converts an ID from website's URL to an object for ease of internal use
 * Needed to differentiate between closed and open branches
 * @param pathID ID in URL
 * @returns
 *    id - actual database ID
 *    isClosed - indicates if the ID refers to closed branch
 */
export function pathIDToBranchUnionID(pathID: string): idBranchUnionT {
  const split = pathID.split("-");
  const id = +split[1];
  const type = split[0];

  if (isNaN(id) || (type != "o" && type != "c"))
    throw new Error(`invalid path id ${pathID} for branch`);

  return { id, isClosed: type == "c" };
}

/**
 * Converts object used to track closed and open branch IDs into
 * string that would appear in website URL
 * @param id.id actual database ID
 * @param id.isClosed indicates if the ID refers to closed branch
 * @returns ID for URL
 */
export function branchUnionIDToPathID(id: idBranchUnionT): string {
  const type = id.isClosed ? "c" : "o";
  return `${type}-${id.id}`;
}
