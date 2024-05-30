import { Card } from "@nextui-org/react";
import PostCardHeader from "../components/post-body/post-card-header";
import MergeRequestTabs from "./components/merge-request-tabs";
import { getPostMergeRequests } from "@/lib/api-calls/merge-request-api";
import MergeRequestList from "./components/merge-request-list";

/**
 * Page that shows all merge requests of a Post.
 * The route is /post/[id]/**version**-list as a more user-friendly name, but the internal naming
 * is **merge request** to avoid confusion with the **version** entity.
 *
 * @param params.id Post ID, taken from route's dynamic segment /[id].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostMergeRequests({
  params,
}: {
  params: { id: string };
}) {
  const mergeRequests = await getPostMergeRequests(params.id);
  return (
    <div className="pt-8">
      <Card className="pb-4 mb-12">
        <PostCardHeader postId={params.id} hideContribute />
      </Card>
      <MergeRequestTabs
        historyList={<MergeRequestList ids={mergeRequests.accepted} />}
        openList={<MergeRequestList grid ids={mergeRequests.open} />}
        rejectedList={<MergeRequestList grid ids={mergeRequests.rejected} />}
      />
    </div>
  );
}
