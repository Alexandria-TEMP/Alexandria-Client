import { Card } from "@nextui-org/react";
import PostCardHeader from "../../components/post-parts/post-card-header";
import BranchTabs from "../../(post)/version-list/components/branch-tabs";
import BranchList from "../../(post)/version-list/components/branch-list";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";
import ErrorWithMessage from "@/components/error-with-message";
import { fetchPostSortedBranchIDs } from "@/lib/api/services/post-api";

/**
 * Page that shows all branches of a Post.
 * The route is /post/[postId]/version-list as a more user-friendly name,
 * but the internal naming is **branch** for consistency with git
 * @param params.postId Post ID, taken from route's dynamic segment /[postId]
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostBranchList({
  params,
}: {
  params: { postId: string };
}) {
  const postUnionID = pathIDToPostUnionID(params.postId);

  if (!postUnionID.isProject) {
    return (
      <ErrorWithMessage message="Non-project posts do not have versions." />
    );
  }

  const branches = await fetchPostSortedBranchIDs(postUnionID.id as idT);

  return (
    <div>
      <Card className="pb-4 mb-12">
        <PostCardHeader
          id={postUnionID.id as idT}
          isProject={postUnionID.isProject}
          hideContribute
        />
      </Card>
      <BranchTabs
        historyList={
          <BranchList
            postPathID={params.postId}
            branchUnionIDs={branches.approvedClosedBranchIDs.map((id) => ({
              id,
              isClosed: true,
            }))}
          />
        }
        rejectedList={
          <BranchList
            grid
            postPathID={params.postId}
            branchUnionIDs={branches.rejectedClosedBranchIDs.map((id) => ({
              id,
              isClosed: true,
            }))}
          />
        }
        openList={
          <BranchList
            grid
            postPathID={params.postId}
            branchUnionIDs={branches.openBranchIDs.map((id) => ({
              id,
              isClosed: false,
            }))}
          />
        }
      />
    </div>
  );
}
