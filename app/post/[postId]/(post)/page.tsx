import getPostData from "../../../lib/api/services/post-api";
import PostCardHeader from "../components/post-parts/post-card-header";
import DiscussionSection from "../components/discussions/discussion-section";
import { Card, CardBody } from "@nextui-org/react";
import RenderedProject from "../components/project-render/rendered-project";
import { parseId } from "@/lib/string-utils";

/**
 * Page that shows contents of a Post.
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { postId: string } }) {
  // TODO remove disable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = await getPostData(parseId(params.postId));

  return (
    <div className="flex flex-col space-y-4 w-full">
      <Card>
        <PostCardHeader id={parseId(params.postId)} />
        <CardBody>
          <RenderedProject
            id={0} // TODO {data.currentVersion.id}
          />
        </CardBody>
      </Card>

      <DiscussionSection
        versionId={0} // TODO {parseId(data.currentVersion.id)}
      />
    </div>
  );
}
