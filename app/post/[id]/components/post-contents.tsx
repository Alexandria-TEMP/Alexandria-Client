import HeaderSubtle from "@/components/header-subtle";
import getPostData from "../lib/post-api";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import PostContentsButtons from "./post-contents-buttons";

export default async function PostContents({ postId }: { postId: string }) {
  const placeholderContents: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";

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
        <PostContentsButtons postId={postId} />
      </CardHeader>

      {/* Contents */}
      <CardBody>
        <p>{placeholderContents}</p>
      </CardBody>
    </Card>
  );
}
