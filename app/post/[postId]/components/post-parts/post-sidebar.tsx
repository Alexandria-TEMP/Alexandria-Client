import { ClassNameProp } from "@/lib/classname-prop";
import getPostData from "@/lib/api-calls/post-api";
import PostCardMini from "../cards/post-card-mini";
import ChipList from "@/components/chip-list";
import AuthorCardList from "../cards/author-card-list";

/**
 * Sidebar that is shown in a Post's page. Includes most of post's metadata.
 *
 * @param postId Post ID
 * @param className CSS classes that get applied to the parent div
 */
export default async function PostSidebar({
  postId,
  className,
}: Readonly<{ postId: string }> & ClassNameProp) {
  const data = await getPostData(postId);

  return (
    <div className={className}>
      <h2>About</h2>
      <h3>Scientific fields</h3>
      <ChipList labels={data.scientificFieldTags} />

      <div className="h-4" />

      <h3>Forked from</h3>
      <PostCardMini postId="2" />

      <div className="h-4" />

      {/* TODO distinguish between authors and collaborators */}

      <h3>Authors</h3>
      <AuthorCardList collaboratorIds={data.collaborators} />

      <div className="h-4" />

      <h3>Collaborators</h3>
      <AuthorCardList collaboratorIds={data.collaborators} />
    </div>
  );
}
