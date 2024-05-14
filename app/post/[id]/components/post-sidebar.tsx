import AuthorCard from "./author-card";
import PostCardMini from "./post-card-mini";
import getPostData from "../lib/post-api";
import { Chip } from "@nextui-org/react";

export default async function PostSidebar({
  postId,
}: Readonly<{ postId: string }>) {
  const data = await getPostData(postId);

  return (
    <div className="w-1/4">
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
