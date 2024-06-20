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
      { next: { revalidate: 1 } },
    );
    await validateResponse(projectPostResponse);
    projectPost = (await projectPostResponse.json()) as ProjectPostT;
  }

  const postID = projectPost?.postID ?? (id.id as idT);
  const postResponse = await fetch(`${baseUrl}/posts/${postID}`, {
    next: { revalidate: 1 },
  });
  await validateResponse(postResponse);

  const post = (await postResponse.json()) as PostT;

  return { post, projectPost, id };
}

/**
 * Fetches post or project post data in a unified object, from just a post ID.
 * For usage when project post ID is unknown (or if it is unknown if post is
 * project post). **Prefer `fetchPostData` when possible**.
 * @param postID post ID (**not** *project post ID*)
 */
export async function fetchDataForPostOfUnkownType(
  postID: idT,
): Promise<PostUnionT> {
  const postResponse = await fetch(`${baseUrl}/posts/${postID}`, {
    next: { revalidate: 1 },
  });
  await validateResponse(postResponse);

  const post = (await postResponse.json()) as PostT;

  if (post.postType != "project") {
    return { post, id: { id: postID, isProject: false } };
  }

  const projectPostIDResponse = await fetch(
    `${baseUrl}/posts/${postID}/project-post`,
  );
  await validateResponse(projectPostIDResponse);
  const projectPostID = (await projectPostIDResponse.json()) as idT;

  const projectPostResponse = await fetch(
    `${baseUrl}/project-posts/${projectPostID}`,
    { next: { revalidate: 1 } },
  );
  await validateResponse(projectPostResponse);
  const projectPost = (await projectPostResponse.json()) as ProjectPostT;

  return { post, projectPost, id: { id: projectPostID, isProject: true } };
}

/**
 * Fetches a project post's branches grouped by review status
 * @param id project post ID
 * @returns object with branch IDs grouped by open, approved and rejected
 */
export async function fetchPostSortedBranchIDs(id: idT) {
  const res = await fetch(`${baseUrl}/project-posts/${id}/branches-by-status`, {
    cache: "no-cache",
  });
  await validateResponse(res);
  return (await res.json()) as {
    openBranchIDs: idT[];
    approvedClosedBranchIDs: idT[];
    rejectedClosedBranchIDs: idT[];
  };
}

/**
 * Gets all posts in the database, paginated. Includes project posts.
 * @param pageNumber which page to fetch
 */
export async function fetchPaginatedPostIDs(
  pageNumber: number,
): Promise<idT[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return [11, 10, 9, 8, 7, 6];
  // const res = await fetch(
  //   `${baseUrl}/filter/posts?page=${pageNumber}&size=10`,
  //   { body: JSON.stringify({ includeProjectPosts: true }) },
  // );
  // await validateResponse(res);
  // return (await res.json()) as idT[];
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
    // If someone uploads the exact same contents, we don't want the same response
    next: { revalidate: 0 },
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
    // If someone uploads the exact same contents, we don't want the same response
    next: { revalidate: 0 },
  });
  await validateResponse(response);
  return response.ok;
}
