import PostContents from "./components/post-body/post-contents";
import Discussion from "./components/discussions/discussion";
import PostSidebar from "./components/post-sidebar";
import getPostData from "../../lib/api-calls/post-api";
import InputDiscussion from "./components/discussions/input-discussion";
import { PostT } from "@/lib/api-types";

/**
 * Page that shows contents of a Post.
 *
 * @param params.id Post ID, taken from route's dynamic segment /[id].
 * Read more: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
 */
export default async function Post({ params }: { params: { id: string } }) {
  const data: PostT = await getPostData(params.id);
  const discussions: string[] = data.currentVersion.discussions;

  return (
    <div className="flex flex-row space-x-6 pt-8">
      {/* Main body */}
      <div className="flex flex-col space-y-4 w-10/12">
        {/* Title, contents, main metadata and action buttons */}
        <PostContents id={params.id} />
        {/* Discussions */}
        <h2>{discussions.length} Replies</h2>
        {discussions.map((id) => (
          <Discussion id={id} key={id} />
        ))}
        {/* Input box for a new discussion */}
        <InputDiscussion versionId={data.currentVersion.id} />
      </div>
      {/* Sidebar with additional metadata */}
      <PostSidebar postId={params.id} className="w-2/12" />
    </div>
  );
}
