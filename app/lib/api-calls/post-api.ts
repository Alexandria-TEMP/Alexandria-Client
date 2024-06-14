import { PostT, PostCreationFormT, idT } from "../types/api-types";
import { validateResponse } from "./api-common";
import { baseUrl } from "./api-common";

/**
 * Gets data for a Post given their ID.
 * @async
 * @param id Post ID
 */
export default async function getPostData(id: idT): Promise<PostT> {
  // TODO
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    title: "Post title",
    discussionIDs: [],
    renderStatus: "failure",
    collaboratorIDs: [1, 2], /// i think these should be different, but branch and post are strutured differently so we need both
    id: id,
    postType: "reflection",
    scientificFields: ["1", "2", "3"],
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
  const response = await fetch(baseUrl + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonPost,
  });
  await validateResponse(response);
  //disable reason: idk how to fix this and still get the correct type cause typescript
  // i have to look into this
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const post: PostT = await response.json();
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

  const response = await fetch(baseUrl + "/posts/" + postId + "/upload", {
    method: "POST",
    body: fileData,
  });
  await validateResponse(response);
  return response.ok;
}
