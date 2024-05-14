import HeaderSubtle from "@/components/header-subtle";
import { getDiscussionData } from "../lib/discussion-api";
import DiscussionReplyButton from "./discussion-reply-button";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

export default async function Discussion({ id }: Readonly<{ id: string }>) {
  const data = await getDiscussionData(id);

  return (
    <Card>
      <CardHeader className="flex gap-x-2 items-baseline">
        {/* TODO link to profile */}
        <p className="font-semibold">
          {data.author.firstName} {data.author.lastName}
        </p>
        <HeaderSubtle>wrote on {data.createdAt}</HeaderSubtle>
        <div className="grow" />
        <DiscussionReplyButton />
      </CardHeader>
      <CardBody>
        <p>{data.text}</p>
      </CardBody>
    </Card>
  );
}
