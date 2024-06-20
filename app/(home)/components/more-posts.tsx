"use client";

import { idT } from "@/lib/types/api-types";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import PostPreviewCard from "./post-preview-card";

/**
 * TODO
 */
export default function MorePosts({
  initPage,
  initPosts,
}: {
  initPage: number;
  initPosts: idT[];
}) {
  const [page, setPage] = useState(initPage + 1);
  const [posts, setPosts] = useState<idT[]>(initPosts);

  const loadMorePosts = async () => {
    const newPosts = await getPostsByPage(page);
    setPage(page + 1);
    setPosts([...posts, ...newPosts]);
  };

  return (
    <>
      {posts.map((id: idT) => (
        <PostPreviewCard postId={id} key={id} />
      ))}

      <Button
        onClick={() => {
          loadMorePosts();
        }}
      >
        Load more posts
      </Button>
    </>
  );
}
