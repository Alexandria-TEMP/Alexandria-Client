import HeaderSubtle from "@/components/header-subtle";
import { getDiscussionData } from "@/lib/api-calls/discussion-api";
import DiscussionReplyButton from "./discussion-reply-button";
import { Card, CardBody } from "@nextui-org/react";

/**
 * Displays a discussion, including: contents, author, creation date, and 'reply' button.
 *
 * @param id Discussion ID
 */
export default async function Discussion({ id }: Readonly<{ id: string }>) {
  const data = await getDiscussionData(id);

  return (
    <Card>
      <CardBody>
        <div className="flex flex-row gap-x-2 items-baseline">
          {/* TODO link to profile */}
          <p className="font-semibold">
            {data.author.firstName} {data.author.lastName}
          </p>
          <HeaderSubtle>wrote on {data.createdAt}</HeaderSubtle>
          <div className="grow" />
          <DiscussionReplyButton />
        </div>
        <p>{data.text}</p>
      </CardBody>
    </Card>
  );
}
