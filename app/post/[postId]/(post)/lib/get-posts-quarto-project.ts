import { PostUnionT } from "@/lib/types/post-union";
import { QuartoContainerT } from "@/lib/types/quarto-container";

/**
 * Returns quarto container that should be used to display a post's project.
 */
export default function getPostsQuartoProject(
  data: PostUnionT,
): QuartoContainerT {
  if (!data.projectPost || data.projectPost.postReviewStatus === "reviewed") {
    return { id: data.post.id, type: "post" };
  }

  if (data.projectPost.postReviewStatus === "open") {
    if (data.projectPost.openBranchIDs.length != 1)
      throw new Error(
        `project post ${data.projectPost.id} is open but has number of open branches != 1`,
      );

    return { id: data.projectPost.openBranchIDs[0], type: "branch" };
  }

  // Else: post is rejected
  if (data.projectPost.closedBranchIDs.length <= 0)
    throw new Error(
      `project post ${data.projectPost.id} is rejected but has no closed branches`,
    );

  return { id: data.projectPost.closedBranchIDs[0], type: "branch" };
}
