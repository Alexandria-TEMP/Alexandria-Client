"use client";

import {} from "@/lib/api/services/discussion-api";
import { Button, Card, CardBody, Divider } from "@nextui-org/react";
import { useDiscussionAndAuthorData } from "@/lib/api/hooks/discussion-hooks";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { idT } from "@/lib/types/api-types";
import GenericLoadingPage from "@/loading";
import { useState } from "react";
import InputDiscussion from "./input-discussion";
import { getMemberName } from "@/lib/get-format";

/**
 * Displays a discussion, including: contents, author, creation date, and 'reply' button.
 * @param id Discussion ID
 */
export default function Discussion({ id }: IdProp) {
  const { data, isLoading, error } = useDiscussionAndAuthorData(id as idT);
  const [replyOpen, setReplyOpen] = useState(false);

  if (isLoading) {
    // TODO discussion skeleton
    return <GenericLoadingPage />;
  }

  if (error || !data) {
    console.log(
      `error in discussion: data is ${JSON.stringify(data)} error is ${error?.message}`,
    );
    // Don't render anything on error
    return <></>;
  }

  return (
    <Card>
      <CardBody>
        <div className="flex flex-row gap-x-2 items-baseline -mt-2">
          <p className="font-semibold">{getMemberName(data.author)}</p>
          {/* TODO need property on discussion DTO */}
          {/* <HeaderSubtle>wrote on {data.createdAt}</HeaderSubtle> */}
          <div className="grow" />
          <Button
            variant="light"
            onPress={() => setReplyOpen(true)}
            isDisabled={replyOpen}
          >
            Reply
          </Button>
        </div>
        <p>{data.discussion.text}</p>
        {replyOpen && (
          <>
            <Divider className="my-4" />
            <InputDiscussion
              id={id as idT}
              onCancel={() => setReplyOpen(false)}
              replyTo={getMemberName(data.author)}
            />
          </>
        )}
      </CardBody>
    </Card>
  );
}
