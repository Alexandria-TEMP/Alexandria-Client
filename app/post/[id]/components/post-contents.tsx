import HeaderSubtle from "@/components/header-subtle";
import getPostData from "@/lib/api-calls/post-api";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import PostLinks from "./post-links";
import ContributeDropdown from "./contribute-dropdown";
import PostEmbed from "./post-embed";

/**
 * Main body of a Post. Includes: title, main metadata, and action buttons.
 *
 * @param postId Post ID
 */
export default async function PostContents({ postId }: { postId: string }) {
  const data = await getPostData(postId);

  return (
    <Card>
      {/* Title */}
      <CardHeader>
        <h1 className="font-semibold">{data.title}</h1>
      </CardHeader>

      {/* (part of) Metadata */}
      <CardHeader className="-mt-4 flex gap-12">
        <div className="flex-col">
          <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
          <HeaderSubtle>Last update on {data.updatedAt}</HeaderSubtle>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Post type</HeaderSubtle>
          <Chip>{data.postType}</Chip>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Chip>{data.status}</Chip>
        </div>
        <div className="grow" />
        <PostLinks postId={postId} currentView="contents" />
        <ContributeDropdown />
      </CardHeader>

      {/* Contents */}
      <CardBody>
        <PostEmbed postId={postId} />
      </CardBody>
    </Card>
  );
}
