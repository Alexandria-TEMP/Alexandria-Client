"use client";

import { Button, ButtonGroup } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function PostContentsButtons({
  postId,
}: Readonly<{ postId: string }>) {
  const router = useRouter();

  return (
    <ButtonGroup>
      <Button onClick={() => router.push(`/post/${postId}/merge-requests`)}>
        {/* ? There's probably a more user-friendly name for this... */}
        Merge Requests
      </Button>
      {/* ! Either contribute or review, depending on status */}
      <Button>Contribute/Review</Button>
      <Button>Fork</Button>
    </ButtonGroup>
  );
}
