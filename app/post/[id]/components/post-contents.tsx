import ContentBox from "@/components/content-box";
import HeaderSubtle from "@/components/header-subtle";
import Tag from "@/components/tag";
import Link from "next/link";
import getPostData from "../lib/post-data";

export default async function PostContents({ postId }: { postId: string }) {
  const placeholderContents: string =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ea, consequatur quibusdam earum reiciendis voluptatem commodi, possimus nemo facere consequuntur ipsum placeat minus excepturi nulla, doloremque quia! Molestiae, natus quasi.";

  const data = await getPostData(postId);

  return (
    <ContentBox>
      {/* Title */}
      <h1 className="font-semibold">{data.title}</h1>
      {/* (part of) Metadata */}
      <div className="flex flex-row space-x-12">
        <div className="flex-col">
          <HeaderSubtle>Created on {data.createdAt}</HeaderSubtle>
          <HeaderSubtle>Last update on {data.updatedAt}</HeaderSubtle>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Post type</HeaderSubtle>
          <Tag>{data.postType}</Tag>
        </div>
        <div className="flex-col">
          <HeaderSubtle>Status</HeaderSubtle>
          <Tag>{data.status}</Tag>
        </div>
        {/* TODO buttons */}
        {/* ? There's probably a more user-friendly name for this... */}
        <Link href={`/post/${postId}/merge-requests`}>Merge Requests</Link>
        {/* ! Either contribute or review, depending on status */}
        <button>Contribute/Review</button>
        <button>Fork</button>
      </div>
      {/* Contents */}
      <p>{placeholderContents}</p>
    </ContentBox>
  );
}
