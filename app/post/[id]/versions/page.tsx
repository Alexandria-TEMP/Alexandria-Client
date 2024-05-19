import { Card } from "@nextui-org/react";
import PostCardHeader from "../components/post-body/post-card-header";
import MergeRequestTabs from "./components/merge-request-tabs";

/**
 * Page that shows all merge requests of a Post.
 * The route is /post/[id]/**versions** as a more user-friendly name, but the internal naming
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
  return (
    <div className="pt-8">
      <Card className="pb-4 mb-12">
        <PostCardHeader postId={params.id} hideContribute />
      </Card>
      <MergeRequestTabs id={params.id} />
    </div>
  );
}
