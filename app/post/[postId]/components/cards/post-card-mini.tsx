"use client";

import { Card, CardBody, CardFooter, Chip, Skeleton } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { idT } from "@/lib/types/api-types";
import { usePostData } from "@/lib/api/hooks/post-hooks";
import { idPostUnionT } from "@/lib/types/post-union";
import ErrorWithMessage from "@/components/error-with-message";
import { useState } from "react";
import PostCardMiniSkeleton from "./post-card-mini-skeleton";
import { postUnionIDToPathID } from "@/lib/id-parser";

/**
 * Mini card that represents a post. Clicking it redirects to the post page.
 * @param id ID of post in card
 * @param isProject indicates post is a project post
 */
export default function PostCardMini({
  id,
  isProject,
}: Readonly<idPostUnionT>) {
  const { data, isLoading, error } = usePostData({ id: id as idT, isProject });
  const router = useRouter();
  // Used to force a rerender on error
  const [rerender, setRerender] = useState(false);

  if (error) {
    return (
      <ErrorWithMessage
        message="Failed to get post data."
        reset={() => setRerender(!rerender)}
      />
    );
  }

  if (isLoading || !data) {
    return <PostCardMiniSkeleton />;
  }

  return (
    <Card
      onPress={() =>
        router.push(
          `/post/${postUnionIDToPathID({ id: id as idT, isProject })}`,
        )
      }
      fullWidth
    >
      <CardBody>
        <Skeleton isLoaded={!isLoading}>
          <h2>{data.post.title}</h2>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <Skeleton isLoaded={!isLoading}>
          <Chip>
            {data.projectPost?.postReviewStatus ?? data.post.postType}
          </Chip>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
