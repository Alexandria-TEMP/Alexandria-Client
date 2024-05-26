"use client";

import { Button, ButtonGroup, Divider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

/**
 * Button group that links to different Post views.
 *
 * @param postId ID of Post the links refer to
 */
export default function PostLinks({
  postId,
}: Readonly<{
  postId: string;
}>) {
  const router = useRouter();
  const pathname = usePathname();

  const hrefs = {
    contents: `/post/${postId}`,
    versions: `/post/${postId}/versions`,
    files: `/post/${postId}/files`,
  };

  return (
    <ButtonGroup>
      <Button
        isDisabled={pathname === hrefs["contents"]}
        onClick={() => router.replace(hrefs["contents"])}
      >
        Contents
      </Button>
      <Divider orientation="vertical" />
      <Button
        isDisabled={pathname === hrefs["versions"]}
        onClick={() => router.replace(hrefs["versions"])}
      >
        Versions
      </Button>
      <Divider orientation="vertical" />
      <Button
        isDisabled={pathname === hrefs["files"]}
        onClick={() => router.replace(hrefs["files"])}
      >
        Files
      </Button>
    </ButtonGroup>
  );
}
