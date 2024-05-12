import ContentBox from "@/components/content-box";
import Tag from "@/components/tag";
import getPostData from "../lib/post-api";
import Link from "next/link";

export default async function PostCardMini({
  postId,
}: Readonly<{ postId: string }>) {
  const data = await getPostData(postId);
  return (
    <ContentBox>
      <Link href={`/post/${data.id}`}>
        <h2>{data.title}</h2>
      </Link>
      <div className="w-fit">
        <Tag>{data.status}</Tag>
      </div>
    </ContentBox>
  );
}
