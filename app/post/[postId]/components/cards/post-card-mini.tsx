"use client";

import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { idT } from "@/lib/types/api-types";
import { usePostData } from "@/lib/api/hooks/post-hooks";
import { idPostUnionT } from "@/lib/types/post-union";
import ErrorWithMessage from "@/components/error-with-message";
import PostCardMiniSkeleton from "./post-card-mini-skeleton";
import { postUnionIDToPathID } from "@/lib/id-parser";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";

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
  const { triggerRerender } = useTriggerRerender();

  if (error) {
    return (
      <ErrorWithMessage
        message="Failed to get post data."
        reset={triggerRerender}
      />
    );
  }

  if (isLoading || !data) {
    return <PostCardMiniSkeleton />;
  }

  return (
    <Card fullWidth>
      <CardBody>
        <h2>{data.post.title}</h2>
      </CardBody>
      <CardFooter className="flex flex-row">
        <div className="grow" />
        <Button
          variant="ghost"
          color="primary"
          onPress={() => {
            router.push(
              `/post/${postUnionIDToPathID({ id: id as idT, isProject })}`,
            );
            router.refresh();
          }}
        >
          Return to post
        </Button>
      </CardFooter>
    </Card>
  );
}
