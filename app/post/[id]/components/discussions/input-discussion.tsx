"use client";

import { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { uploadDiscussion } from "@/lib/api-calls/discussion-api";

/**
 * TextArea to create a new discussion for some Version.
 * Includes: header, and submit button.
 *
 * @param versionId ID of version the discussion refers to
 */
export default function InputDiscussion({
  versionId,
}: Readonly<{ versionId: string }>) {
  const [input, setInput] = useState("");

  return (
    <div>
      <Textarea
        label={<h2>Your reply</h2>}
        labelPlacement="outside"
        placeholder="Start a new discussion..."
        value={input}
        onValueChange={setInput}
      />
      <Button
        className="mt-4"
        onClick={() => {
          uploadDiscussion(input, versionId).catch(() =>
            alert("Failed to submit discussion."),
          );
        }}
      >
        Post your answer
      </Button>
    </div>
  );
}
