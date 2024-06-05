import { PostT } from "../api-types";

/**
 * Gets data for a Post given their ID.
 *
 * @async
 * @param id Post ID
 */
export default async function getPostData(id: string): Promise<PostT> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    title: "Post title",
    status: "Open for review",
    authors: ["3"],
    contributors: ["1", "2"],
    collaborators: ["1", "2"], /// i think these should be different, but mr and post are strutured differently so we need both
    anonymous: false,
    createdAt: "10 May 2024",
    currentVersion: {
      id: "1",
      discussions: ["1", "1", "1", "1"],
    },
    id: id,
    postType: "Reflection",
    scientificFieldTags: ["1", "2", "3"],
    updatedAt: "11 May 2024",
    feedbackPreferences: "Community Discussion",
    completionStatus: "Ongoing",
  };
}
