import { Post } from "../types/api-types";

/**
 * Gets data for a Post given their ID.
 *
 * @async
 * @param id Post ID
 */
export default async function getPostData(id: string): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    title: "Post title",
    status: "Open for review",
    collaborators: ["1", "2"],
    createdAt: new Date(2024, 4, 10),
    currentVersion: {
      id: "1",
      discussions: ["1", "1", "1", "1"],
    },
    id: id,
    postType: "Reflection",
    scientificFieldTags: [
      "Computer Science",
      "Mathematics",
      "Theory of computation",
    ],
    updatedAt: new Date(2024, 4, 20),
  };
}
