import { Card } from "@nextui-org/react";
import { getPostBranches } from "@/lib/api-calls/branch-api";
import { idStringToIDT } from "@/lib/string-utils";
import PostCardHeader from "../../components/post-parts/post-card-header";
import BranchTabs from "../../(post)/version-list/components/branch-tabs";
import BranchList from "../../(post)/version-list/components/branch-list";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { idT } from "@/lib/types/api-types";

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
  const branches = await getPostBranches(idStringToIDT(params.postId));
  const postUnionID = pathIDToPostUnionID(params.postId);
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
        historyList={<BranchList ids={branches.accepted} postId={0} />}
        openList={<BranchList grid ids={branches.open} postId={0} />}
        rejectedList={<BranchList grid ids={branches.rejected} postId={0} />}
      />
    </div>
  );
}
