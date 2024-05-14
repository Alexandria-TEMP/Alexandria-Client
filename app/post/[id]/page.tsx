import ThemeSwitcher from "@/components/theme-switcher";
import PostContents from "./components/post-contents";
import Discussion from "./components/discussion";
import PostSidebar from "./components/post-sidebar";
import getPostData from "./lib/post-api";
import InputDiscussion from "./components/input-discussion";

export default async function Post({ params }: { params: { id: string } }) {
  const data = await getPostData(params.id);
  const discussions = data.currentVersion.discussions;

  return (
    <div className="flex flex-row space-x-6 pt-8">
      {/* Main body */}
      <div className="flex flex-col space-y-4">
        {/* TODO put this in a header instead of here */}
        <ThemeSwitcher />
        {/* Title, contents, main metadata and action buttons */}
        <PostContents postId={params.id} />
        {/* Discussions */}
        <h2>{discussions.length} Replies</h2>
        {discussions.map((id) => (
          <Discussion id={id} key={id} />
        ))}
        {/* Input box for a new discussion */}
        <InputDiscussion versionId={data.currentVersion.id} />
      </div>
      {/* Sidebar with additional metadata */}
      <PostSidebar postId={params.id} />
    </div>
  );
}
