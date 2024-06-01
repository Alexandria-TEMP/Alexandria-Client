import AuthorCard from "./author-card";
import PostCardMini from "./post-card-mini";
import getPostData from "../../../lib/api-calls/post-api";
import { Chip } from "@nextui-org/react";
import { ClassNameProp } from "@/lib/classname-prop";
import { PostT } from "@/lib/api-types";

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
  const data: PostT = await getPostData(postId);

  return (
    <div className={className}>
      <h2>About</h2>
      <h3>Scientific fields</h3>
      <div className="flex flex-row flex-wrap gap-x-3 gap-y-2">
        {data.scientificFieldTags.map((field, index) => (
          <Chip key={index}>{field}</Chip>
        ))}
      </div>

      <div className="h-4" />

      <h3>Forked from</h3>
      <PostCardMini postId="2" />

      <div className="h-4" />

      <h3>Authors</h3>
      <div className="flex flex-col gap-y-2">
        {data.collaborators.map((id) => (
          <AuthorCard memberId={id} key={id} />
        ))}
      </div>

      <div className="h-4" />

      <h3>Collaborators</h3>
      <div className="flex flex-col gap-y-2">
        {data.collaborators.map((id) => (
          <AuthorCard memberId={id} key={id} />
        ))}
      </div>
    </div>
  );
}
