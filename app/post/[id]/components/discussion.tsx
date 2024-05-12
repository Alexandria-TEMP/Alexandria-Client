import ContentBox from "@/components/content-box";
import HeaderSubtle from "@/components/header-subtle";
import { getDiscussionData } from "../lib/discussion-api";
import DiscussionReplyButton from "./discussion-reply-button";

export default async function Discussion({ id }: Readonly<{ id: string }>) {
  const data = await getDiscussionData(id);

  return (
    <ContentBox>
      <div className="flex flex-col items-stretch gap-y-2">
        <div className="flex flex-row items-baseline gap-x-2">
          {/* TODO link to profile */}
          <p className="font-semibold">
            {data.author.firstName} {data.author.lastName}
          </p>
          <HeaderSubtle>wrote on {data.createdAt}</HeaderSubtle>
          <div className="grow" />
          <DiscussionReplyButton />
        </div>
        <p>{data.text}</p>
      </div>
    </ContentBox>
  );
}
