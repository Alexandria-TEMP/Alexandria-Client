import { Card } from "@nextui-org/react";
import PostCardHeader from "../components/post-parts/post-card-header";
import MergeRequestTabs from "../../[postId]/version-list/components/merge-request-tabs";
import { getPostMergeRequests } from "@/lib/api-calls/merge-request-api";
import MergeRequestList from "../../[postId]/version-list/components/merge-request-list";
import { parseId } from "@/lib/string-utils";

/**
 * Page that shows all merge requests of a Post.
 * The route is /post/[postId]/**version**-list as a more user-friendly name, but the internal naming
 * is **merge request** to avoid confusion with the **version** entity.
 *
 * @param params.postId Post ID, taken from route's dynamic segment /[id].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostMergeRequests({
  params,
}: {
  params: { postId: string };
}) {
  const mergeRequests = await getPostMergeRequests(parseId(params.postId));
  return (
    <div className="pt-8">
      <Card className="pb-4 mb-12">
        <PostCardHeader postId={params.postId} hideContribute />
      </Card>
      <MergeRequestTabs
        historyList={<MergeRequestList ids={mergeRequests.accepted} />}
        openList={<MergeRequestList grid ids={mergeRequests.open} />}
        rejectedList={<MergeRequestList grid ids={mergeRequests.rejected} />}
      />
    </div>
  );
}
