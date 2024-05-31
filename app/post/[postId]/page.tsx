import PostContents from "./components/post-parts/post-contents";
import Discussion from "./components/discussions/discussion";
import getPostData from "../../lib/api-calls/post-api";
import InputDiscussion from "./components/discussions/input-discussion";
import PostSidebar from "./components/post-parts/post-sidebar";

/**
 * Page that shows contents of a Post.
 *
 * @param params.postId Post ID, taken from route's dynamic segment /[postId].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { postId: string } }) {
  const data = await getPostData(params.postId);
  const discussions = data.currentVersion.discussions;

  return (
    <div className="flex flex-row space-x-6 pt-8">
      {/* Main body */}
      <div className="flex flex-col space-y-4 w-10/12">
        {/* Title, contents, main metadata and action buttons */}
        <PostContents id={params.postId} />
        {/* Discussions */}
        <h2>{discussions.length} Replies</h2>
        {discussions.map((id) => (
          <Discussion id={id} key={id} />
        ))}
        {/* Input box for a new discussion */}
        <InputDiscussion versionId={data.currentVersion.id} />
      </div>
      {/* Sidebar with additional metadata */}
      <PostSidebar postId={params.postId} className="w-2/12" />
    </div>
  );
}
