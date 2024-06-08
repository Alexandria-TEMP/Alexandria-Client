import getPostData from "../../../lib/api-calls/post-api";
import PostCardHeader from "../components/post-parts/post-card-header";
import { parseId } from "@/lib/string-utils";
import DiscussionSection from "../components/discussions/discussion-section";
import { Card, CardBody } from "@nextui-org/react";
import VersionRender from "../components/version-render/component";

/**
 * Page that shows contents of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { postId: string } }) {
  const data = await getPostData(params.postId);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader postId={params.postId} />
        <CardBody>
          <VersionRender id={data.currentVersion.id} />
        </CardBody>
      </Card>

      <DiscussionSection versionId={parseId(data.currentVersion.id)} />
    </div>
  );
}
