import { PostT, idT } from "../types/api-types";

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
