"use client";

import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { getMembers } from "./lib/member-api";
import { getFields } from "./lib/fields-api";
import { MultiSelectAutocomplete } from "./components/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "./components/single-select-autocomplete";
import UploadContentCard from "./components/upload-content-card";
import InputCard from "./components/input-card";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { Card } from "@nextui-org/react";

export default function NewPost() {
  const USERS = getMembers();
  const FIELDS = getFields();

  const [title, setTitle] = useState("");

  const [authors, setAuthors] = useState<Set<React.Key>>(new Set());
  const [contributors, setContributors] = useState<Set<React.Key>>(new Set());
  const [fields, setFields] = useState<Set<React.Key>>(new Set());

  const [type, setType] = useState("");
  const [completion, setCompletion] = useState("");
  const [feedback, setFeedback] = useState("");

  const submit = () => {
    alert(
      "Title: " +
        title +
        "\n" +
        "Authors: " +
        Array.from(authors.keys()).map((a) => a.toString()) +
        "\n" +
        "Contributors: " +
        Array.from(contributors.keys()).map((a) => a.toString()) +
        "\n" +
        "Fields: " +
        Array.from(fields.keys()).map((a) => a.toString()) +
        "\n" +
        "Completion: " +
        completion +
        "\n" +
        "Type: " +
        type +
        "\n" +
        "Feedback: " +
        feedback,
    );
  };

  return (
    <div className="w-full relative">
      <div className="m-auto max-w-4xl w-10/12">
        {/* Little top bar */}
        <div className="sticky flex justify-between py-5">
          <h1 className="max-w-fit">Create a new post</h1>
          <Button variant="ghost" onClick={(e) => submit()}>
            Publish
          </Button>
        </div>
        {/* The actual form */}
        <Card className="p-7">
          <div className="flex flex-col space-y-5">
            <InputCard
              title="Title"
              placeholder="Enter a title for your project..."
              value={title}
              setValue={setTitle}
            />

            <Divider />

            <UploadContentCard />

            <Divider />

            <MultiSelectAutocomplete
              title="Authors"
              description="Select the main people who worked on this post"
              selected={authors}
              items={USERS}
              setSelectedItems={setAuthors}
              getItemLabel={getMemberName}
            />

            <Divider />

            <MultiSelectAutocomplete
              title="Contributors"
              description="Select the people who helped with this post"
              selected={contributors}
              items={USERS}
              setSelectedItems={setContributors}
              getItemLabel={getMemberName}
            />

            <Divider />

            <MultiSelectAutocomplete
              title="Scientific fields"
              description="Select the scientific fields your post is about"
              selected={fields}
              items={FIELDS}
              setSelectedItems={setFields}
              getItemLabel={getFieldName}
            />

            <Divider />

            <SingleSelectAutocomplete
              title="What type will your post be?"
              description="The type of post represents what kind of content you are sharing"
              placeholder="Select a type for your post..."
              items={["Project", "Question", "Reflection"]}
              setSelection={setType}
            />

            <Divider />

            <SingleSelectAutocomplete
              title="What are your feedback preferences?"
              description="The type of replies you want to encourage under your post"
              placeholder="Select the type of feedback preferences you want..."
              items={["Community Discussion", "Formal Feedback"]}
              setSelection={setFeedback}
            />

            <Divider />

            <SingleSelectAutocomplete
              title="What is the completion of your project?"
              description="This helps other users understand your work and give advice"
              placeholder="Select the completion status for your post..."
              items={["Ideation (to begin)", "Ongoing", "Completed"]}
              setSelection={setCompletion}
            />

            <Divider />
          </div>
        </Card>
      </div>
    </div>
  );
}
