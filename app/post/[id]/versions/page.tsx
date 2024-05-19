import { Card } from "@nextui-org/react";
import PostCardHeader from "../components/post-body/post-card-header";

/**
 * Page that shows all versions of a Post.
 *
 * @param params.id Post ID, taken from route's dynamic segment /[id].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostVersions({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="pt-8">
      <Card>
        <PostCardHeader postId={params.id} />
      </Card>
    </div>
  );
}
