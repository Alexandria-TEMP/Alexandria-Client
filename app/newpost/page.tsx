"use client";

import { useState, useMemo } from "react";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { getMembers } from "../lib/api-calls/member-api";
import { getFields } from "../lib/api-calls/fields-api";
import { MultiSelectAutocomplete } from "../components/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "./components/single-select-autocomplete";
import UploadContentCard from "./components/upload-content-card";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { Card, Input } from "@nextui-org/react";
import { submit, validate } from "./lib/submit";
import { validateTitle } from "./lib/validators";

export default function NewPost() {
  const USERS = getMembers();
  const FIELDS = getFields();

  const feedbacks = ["Community Discussion", "Formal Feedback"];
  const types = ["Project", "Question", "Reflection"];
  const completions = ["Ideation (to begin)", "Ongoing", "Completed"];

  // default values, should be refactored into a different file maybe
  const defFeedback = 0;
  const defType = 0;
  const defCompletion = 0;

  const [title, setTitle] = useState<string>(""); // use the null to check if the title is empty because the page just loaded
  const [authors, setAuthors] = useState<Set<string>>(new Set());
  const [contributors, setContributors] = useState<Set<string>>(new Set());
  const [fields, setFields] = useState<Set<string>>(new Set());

  const [type, setType] = useState(types[defType]);
  const [completion, setCompletion] = useState(completions[defCompletion]);
  const [feedback, setFeedback] = useState(feedbacks[defFeedback]);

  // TODO, since input is no longer its own separate component, idk where to store this variable
  // TODO technically this is kind of a hacky workaround, see MR !4 for more details
  const [isFirstTitle, setIsFirstTitle] = useState(true);
  const isInvalidTitle = useMemo(
    () => !isFirstTitle && validateTitle(title) !== true,
    [title, isFirstTitle],
  );

  const isValid = useMemo(
    () =>
      validate({
        title,
        authors,
        contributors,
        fields,
        type,
        completion,
        feedback,
      }),
    [title, authors, contributors, fields, type, completion, feedback],
  );

  return (
    <form
      className="w-full relative"
      onSubmit={() =>
        submit({
          title,
          authors,
          contributors,
          fields,
          type,
          completion,
          feedback,
        })
      }
    >
      <div className="m-auto max-w-4xl w-10/12">
        {/* Little top bar */}
        <div className="sticky flex justify-between py-5">
          <h1 className="max-w-fit">Create a new post</h1>
          <Button variant="ghost" type="submit" isDisabled={!isValid}>
            Publish
          </Button>
        </div>
        {/* The actual form */}
        <Card className="p-7">
          <div className="flex flex-col space-y-5">
            <Input
              label={<h2 className="max-w-fit inline-block">Title</h2>}
              labelPlacement="outside"
              placeholder="Enter a title for your project..."
              className="space-y-2"
              isRequired
              errorMessage={validateTitle(title)}
              isInvalid={isInvalidTitle}
              validate={(value) => validateTitle(value)}
              onChange={(e) => {
                setTitle(e.currentTarget.value);
                setIsFirstTitle(false);
              }}
            />

            <Divider />

            <UploadContentCard />

            <Divider />

            <MultiSelectAutocomplete
              title="Authors"
              description="Select the main people who worked on this post"
              selected={authors}
              items={USERS}
              isRequired={true}
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
              defaultSelectedKey={defType.toString()}
              items={types}
              setSelection={setType}
            />

            <Divider />

            <SingleSelectAutocomplete
              title="What are your feedback preferences?"
              description="The type of replies you want to encourage under your post"
              placeholder="Select the type of feedback preferences you want..."
              defaultSelectedKey={defFeedback.toString()}
              items={feedbacks}
              setSelection={setFeedback}
            />

            <Divider />

            <SingleSelectAutocomplete
              title="What is the completion of your project?"
              description="This helps other users understand your work and give advice"
              placeholder="Select the completion status for your post..."
              defaultSelectedKey={defCompletion.toString()}
              items={completions}
              setSelection={setCompletion}
            />

            <Divider />
          </div>
        </Card>
      </div>
    </form>
  );
}
