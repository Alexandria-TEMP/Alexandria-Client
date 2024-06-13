import { Card } from "@nextui-org/react";
import { getPostBranches } from "@/lib/api-calls/branch-api";
import { parseId } from "@/lib/string-utils";
import PostCardHeader from "../../components/post-parts/post-card-header";
import BranchTabs from "../../(post)/version-list/components/branch-tabs";
import BranchList from "../../(post)/version-list/components/branch-list";

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
  const branches = await getPostBranches(parseId(params.postId));
  const id = parseId(params.postId);
  return (
    <div>
      <Card className="pb-4 mb-12">
        <PostCardHeader id={parseId(params.postId)} hideContribute />
      </Card>
      <BranchTabs
        historyList={<BranchList ids={branches.accepted} postId={id} />}
        openList={<BranchList grid ids={branches.open} postId={id} />}
        rejectedList={<BranchList grid ids={branches.rejected} postId={id} />}
      />
    </div>
  );
}
