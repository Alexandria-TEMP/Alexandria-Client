import { Card } from "@nextui-org/react";
import PostCardHeader from "../components/post-body/post-card-header";
import VersionTabs from "./components/version-tabs";

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
    <div className="pt-8 flex flex-col gap-12">
      <Card>
        <PostCardHeader postId={params.id} hideContribute />
      </Card>
      <VersionTabs id={params.id} />
    </div>
  );
}
