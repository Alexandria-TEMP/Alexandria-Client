import { PostT, ProjectPostT, idT } from "../../types/api-types";
import { PostUnionT, idPostUnionT } from "../../types/post-union";
import { baseUrl, validateResponse } from "../api-common";
import { PostCreationFormT } from "../../types/api-types";

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

/**
 * Method that sends a POST request to the server to create a new post, currently only metadata
 * @async
 * @param postCreationForm object containing post creation form data
 * @returns the newly created post
 */
export async function postPosts(
  postCreationForm: PostCreationFormT,
): Promise<PostT> {
  const jsonPost = JSON.stringify(postCreationForm);
  const response = await fetch(`${baseUrl}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPost,
  });
  await validateResponse(response);
  const post: PostT = (await response.json()) as PostT;
  return post;
}

/**
 * Method that sends a POST request to the server to upload a new file to an existing (non project) post
 * File technically gets sent as multipart form data
 * @async
 * @param postId the id of the post we want to upload files to
 * @param file the file object
 * @returns whether the request retuned a 200OK response
 */
export async function postPostsIdUpload(postId: idT, file: File) {
  const fileData = new FormData();
  fileData.append("file", file);

  const response = await fetch(`${baseUrl}/posts/${postId}/upload`, {
    method: "POST",
    body: fileData,
  });
  await validateResponse(response);
  return response.ok;
}
