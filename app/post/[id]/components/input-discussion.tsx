"use client";

import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { uploadDiscussion } from "../lib/discussion-api";

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
      <button onClick={() => uploadDiscussion(input, versionId)}>
        Post your answer
      </button>
    </div>
  );
}
