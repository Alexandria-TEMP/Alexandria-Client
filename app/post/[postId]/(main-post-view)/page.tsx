import VersionContentCard from "../components/post-parts/version-content-card";
import getPostData from "../../../lib/api-calls/post-api";
import PostCardHeader from "../components/post-parts/post-card-header";
import { parseId } from "@/lib/string-utils";
import DiscussionSection from "../components/discussions/discussion-section";

/**
 * Page that shows contents of a Post.
 *
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { postId: string } }) {
  const data = await getPostData(params.postId);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <VersionContentCard
        header={<PostCardHeader postId={params.postId} />}
        versionId={parseId(data.currentVersion.id)}
      />
      <DiscussionSection versionId={parseId(data.currentVersion.id)} />
    </div>
  );
}
