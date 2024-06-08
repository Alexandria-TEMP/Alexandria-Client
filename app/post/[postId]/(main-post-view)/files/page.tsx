import getPostData from "@/lib/api-calls/post-api";
import { Card, CardBody } from "@nextui-org/react";
import PostCardHeader from "../../components/post-parts/post-card-header";
import DiscussionSection from "../../components/discussions/discussion-section";
import { parseId } from "@/lib/string-utils";
import FileTree from "../../components/files/file-tree";

/**
 * Page that shows files of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function PostFiles({
  params,
}: {
  params: { postId: string };
}) {
  const data = await getPostData(params.postId);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader postId={params.postId} />
        <CardBody>
          <FileTree id={data.currentVersion.id} />
        </CardBody>
      </Card>

      <DiscussionSection versionId={parseId(data.currentVersion.id)} />
    </div>
  );
}
