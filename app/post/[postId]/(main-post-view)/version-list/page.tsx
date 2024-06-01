import { Card } from "@nextui-org/react";
import { getPostMergeRequests } from "@/lib/api-calls/merge-request-api";
import { parseId } from "@/lib/string-utils";
import PostCardHeader from "../../components/post-parts/post-card-header";
import MergeRequestTabs from "./components/merge-request-tabs";
import MergeRequestList from "./components/merge-request-list";

/**
 * Page that shows all merge requests of a Post.
 * The route is /post/[postId]/**version**-list as a more user-friendly name, but the internal naming
 * is **merge request** to avoid confusion with the **version** entity.
 *
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostMergeRequests({
  params,
}: {
  params: { postId: string };
}) {
  const mergeRequests = await getPostMergeRequests(parseId(params.postId));
  const id = parseId(params.postId);
  return (
    <div>
      <Card className="pb-4 mb-12">
        <PostCardHeader postId={params.postId} hideContribute />
      </Card>
      <MergeRequestTabs
        historyList={
          <MergeRequestList ids={mergeRequests.accepted} postId={id} />
        }
        openList={
          <MergeRequestList grid ids={mergeRequests.open} postId={id} />
        }
        rejectedList={
          <MergeRequestList grid ids={mergeRequests.rejected} postId={id} />
        }
      />
    </div>
  );
}
