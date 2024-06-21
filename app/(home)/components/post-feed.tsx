"use client";

import { idT } from "@/lib/types/api-types";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import PostPreviewCard from "./post-preview-card";
import { fetchPaginatedPostIDs } from "@/lib/api/services/post-api";

/**
 * Displays a list of posts as [PostPreviewCard](./post-preview-card.tsx)
 * and a button to optionally fetch another page of posts
 * @param initialPage page to start paginating from
 * @param initialPostIDs starts feed with the posts listed here
 */
export default function PostFeed({
  initialPage,
  initialPostIDs,
}: {
  initialPage?: number;
  initialPostIDs?: idT[];
}) {
  const [nextPage, setNextPage] = useState(initialPage ?? 0 + 1);
  const [posts, setPosts] = useState<idT[]>(initialPostIDs ?? []);

  const loadMorePosts = () => {
    fetchPaginatedPostIDs(nextPage)
      .then((newPosts) => {
        setNextPage(nextPage + 1);
        setPosts([...posts, ...newPosts]);
      })
      .catch((reason) => {
        alert(`Failed to load more posts. \n[${reason}]`);
      });
  };

  // Disable reason: this should only run once, when component is mounted
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(loadMorePosts, []);

  return (
    <div className="space-y-7 w-full">
      {posts.map((id: idT) => (
        <PostPreviewCard postID={id} key={id} />
      ))}

      <Button onPress={loadMorePosts}>Load more posts</Button>
    </div>
  );
}
