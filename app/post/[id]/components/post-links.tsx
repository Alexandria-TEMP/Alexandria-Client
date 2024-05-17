"use client";

import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { useRouter } from "next/navigation";

/**
 * Button group that links to different Post views.
 *
 * @param postId ID of Post the links refer to
 * @param currentView Which Post view is currently active
 */
export default function PostLinks({
  postId,
  currentView,
}: Readonly<{
  postId: string;
  currentView: "contents" | "versions" | "files";
}>) {
  const router = useRouter();

  return (
    <ButtonGroup>
      <Button
        isDisabled={currentView === "contents"}
        onClick={() => router.replace(`/post/${postId}`)}
      >
        Contents
      </Button>
      <Divider orientation="vertical" />
      <Button
        isDisabled={currentView === "versions"}
        onClick={() => router.replace(`/post/${postId}/versions`)}
      >
        Versions
      </Button>
      <Divider orientation="vertical" />
      <Button
        isDisabled={currentView === "files"}
        onClick={() => router.replace(`/post/${postId}/files`)}
      >
        Files
      </Button>
    </ButtonGroup>
  );
}
