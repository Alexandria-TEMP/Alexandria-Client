import { PostT, ProjectPostT, idT } from "../../types/api-types";
import { PostUnionT, idPostUnionT } from "../../types/post-union";
import { baseUrl, validateResponse } from "../api-common";

/**
 * Fetches post or project post data in a unified object
 * @param id post or project post id
 * @returns post and optionally project post data
 */
export async function fetchPostData(id: idPostUnionT): Promise<PostUnionT> {
  let projectPost = undefined;

  if (id.isProject) {
    const projectPostResponse = await fetch(
      `${baseUrl}/project-posts/${id.id}`,
    );
    await validateResponse(projectPostResponse);
    projectPost = (await projectPostResponse.json()) as ProjectPostT;
  }

  const postID = projectPost?.postID ?? (id.id as idT);
  const postResponse = await fetch(`${baseUrl}/posts/${postID}`);
  await validateResponse(postResponse);

  const post = (await postResponse.json()) as PostT;

  return { post, projectPost, id };
}

/**
 * Fetches a project post's branches grouped by review status
 * @param id project post ID
 * @returns object with branch IDs grouped by open, approved and rejected
 */
export async function fetchPostSortedBranchIDs(id: idT) {
  const res = await fetch(`${baseUrl}/project-posts/${id}/branches-by-status`);
  await validateResponse(res);
  return (await res.json()) as {
    openBranchIDs: idT[];
    approvedClosedBranchIDs: idT[];
    rejectedClosedBranchIDs: idT[];
  };
}
