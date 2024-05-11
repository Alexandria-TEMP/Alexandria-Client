import ContentBox from "@/components/content-box";
import Tag from "@/components/tag";

// TODO props should be just link to post
export default function PostCardMini({
  title,
  status,
}: Readonly<{ title: string; status: string }>) {
  return (
    <ContentBox>
      <h2>{title}</h2>
      <div className="w-fit">
        <Tag>{status}</Tag>
      </div>
    </ContentBox>
  );
}
