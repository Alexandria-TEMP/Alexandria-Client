import getPostData from "@/lib/api-calls/post-api";
import ChipList from "@/components/common/chip-list";
import AuthorCardList from "../cards/author-card-list";
import Sidebar from "@/components/layout/sidebar";
import { parseId } from "@/lib/string-utils";
// import PostCardMini from "../cards/post-card-mini";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 * @param postId Post ID
 */
export default async function PostSidebar({
  postId,
}: Readonly<{ postId: string }>) {
  const data = await getPostData(postId);

  return (
    <Sidebar
      items={[
        {
          title: "Scientific fields",
          node: <ChipList labels={data.scientificFieldTags} />,
        },
        // TODO render this conditionally
        // {
        //   title: "Forked from",
        //   node: <PostCardMini id="2" />,
        // },
        // TODO distinguish between authors and collaborators
        {
          title: "Authors",
          node: <AuthorCardList ids={data.collaborators.map(parseId)} />,
        },
        {
          title: "Collaborators",
          node: <AuthorCardList ids={data.collaborators.map(parseId)} />,
        },
      ]}
    />
  );
}
