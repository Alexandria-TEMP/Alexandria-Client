"use client";

import { useState } from "react";
import { Button, Switch, Textarea } from "@nextui-org/react";
import { uploadDiscussion } from "@/lib/api/services/discussion-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { idT } from "@/lib/types/api-types";
import HeaderSubtle from "@/components/common/header-subtle";

/**
 * TextArea to create a new discussion for some Version.
 * Includes header, and submit button.
 * @param id discussion container ID or discussion ID
 * @param isRoot indicates discussion replies directly to a post or branch
 * @param onCancel action that happens when 'cancel' button is pressed.
 *                 if undefined, no 'cancel' button will be rendered
 * @param replyTo optional name displayed next to 'Reply to'
 */
export default function InputDiscussion({
  id,
  isRoot,
  onCancel,
  replyTo,
}: IdProp &
  Readonly<{ isRoot?: boolean; onCancel?: () => void; replyTo?: string }>) {
  // TODO

  const [input, setInput] = useState("");

  return (
    <div>
      <Textarea
        label={
          isRoot ? (
            <h2>Your reply</h2>
          ) : (
            <HeaderSubtle>
              {replyTo ? `Reply to ${replyTo}` : "Your reply"}
            </HeaderSubtle>
          )
        }
        labelPlacement="outside"
        placeholder="Start a new discussion..."
        value={input}
        onValueChange={setInput}
      />
      <div className="flex flex-row mt-4 content-center gap-2">
        <div className="flex flex-col">
          <Switch size="sm" />
          <HeaderSubtle>Anonymous reply</HeaderSubtle>
        </div>
        <div className="grow" />
        {onCancel && (
          <Button color="danger" onPress={onCancel}>
            Cancel
          </Button>
        )}
        <Button
          onPress={() => {
            uploadDiscussion(input, id as idT).catch(() =>
              alert("Failed to submit discussion."),
            );
          }}
        >
          Post your answer
        </Button>
      </div>
    </div>
  );
}
