import ContentBox from "@/components/content-box";
import ThemeSwitcher from "@/components/theme-switcher";
import PostContents from "./components/post-contents";
import Discussion from "./components/discussion";
import PostSidebar from "./components/post-sidebar";
import getPostData from "./lib/post-data";

export default async function Post({ params }: { params: { id: string } }) {
  const data = await getPostData(params.id);
  const numberOfDiscussions: number = data.currentVersion.discussions.length;

  return (
    <div className="flex flex-row space-x-6">
      {/* TODO put this in a header instead of here */}
      <ThemeSwitcher />
      {/* Main body */}
      <div className="flex flex-col space-y-4">
        <PostContents postId={params.id} />
        {/* Discussions */}
        <h2>{numberOfDiscussions} Replies</h2>
        <Discussion />
        <Discussion />
        <h2>Your reply</h2>
        <ContentBox>
          <p>User input text...</p>
        </ContentBox>
        <button>Post your answer</button>
      </div>
      <PostSidebar />
    </div>
  );
}
