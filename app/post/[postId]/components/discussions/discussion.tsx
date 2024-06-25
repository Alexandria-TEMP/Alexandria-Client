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
import HeaderSubtle from "@/components/common/header-subtle";
import { formatDateString } from "@/lib/string-utils";

/**
 * Displays a discussion, including: contents, author, creation date, and 'reply' button.
 * @param id Discussion ID
 */
export default function Discussion({
  id,
  isRoot = true,
}: IdProp & { isRoot?: boolean }) {
  const { data, isLoading, error } = useDiscussionAndAuthorData(id as idT);
  const [replyOpen, setReplyOpen] = useState(false);

  if (isLoading || !data || !data.discussion) {
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
    <Card className={!isRoot ? "bg-default-100" : ""}>
      <CardBody className="space-y-5">
        <div className="flex flex-row gap-x-2 items-baseline -mt-2">
          <p className="font-semibold">
            {data.author ? getMemberName(data.author) : "Anonymous"}
          </p>
          {/* TODO need property on discussion DTO */}
          <HeaderSubtle>
            wrote on {formatDateString(data.discussion.createdAt)}
          </HeaderSubtle>
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
              isRoot={false}
              onCancel={() => setReplyOpen(false)}
              replyTo={data.author ? getMemberName(data.author) : "Anonymous"}
            />
          </>
        )}
        {data.discussion.replyIDs.map((id) => (
          <Discussion id={id} isRoot={false} key={id} />
        ))}
      </CardBody>
    </Card>
  );
}
