"use client";

import { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";
import { uploadDiscussion } from "@/lib/api/services/discussion-api";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { idT } from "@/lib/types/api-types";

/**
 * TextArea to create a new discussion for some Version.
 * Includes header, and submit button.
 * @param id discussion container ID
 */
export default function InputDiscussion({ id }: IdProp) {
  // TODO

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
          uploadDiscussion(input, id as idT).catch(() =>
            alert("Failed to submit discussion."),
          );
        }}
      >
        Post your answer
      </Button>
    </div>
  );
}
