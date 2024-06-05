"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { getMembers } from "../lib/api-calls/member-api";
import { getFields } from "../lib/api-calls/fields-api";
import { MultiSelectAutocomplete } from "../components/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "./components/single-select-autocomplete";
import UploadContentCard from "./components/upload-content-card";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { Card, Input } from "@nextui-org/react";
import { submit } from "./lib/submit";
import { useForm, Controller } from "react-hook-form";

/**
 * TODO jsdoc @miruna
 */
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

  const { handleSubmit, formState, control } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      authors: [] as string[],
      contributors: [] as string[],
      fields: [] as string[],
      type: types[defType],
      completion: completions[defCompletion],
      feedback: feedbacks[defFeedback],
    },
  });

  return (
    // disable reason: this is the intended usage for handleSubmit
    // linter complains about it being a promise, but if i fix it then `submit` function does not get called
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="w-full relative" onSubmit={handleSubmit(submit)}>
      <div className="m-auto max-w-4xl w-10/12">
        {/* Little top bar */}
        <div className="sticky flex justify-between py-5">
          <h1 className="max-w-fit">Create a new post</h1>
          <Button variant="ghost" type="submit">
            Publish
          </Button>
        </div>
        {/* The actual form */}
        <Card className="p-7">
          <div className="flex flex-col space-y-5">
            <Controller
              name="title"
              control={control}
              rules={{
                required: "Please enter a title for your post.",
                maxLength: {
                  value: 150,
                  message: "There is a 150 character limit for post titles.", // TODO decide how long we actually want this
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={<h2 className="max-w-fit inline-block">Title</h2>}
                  labelPlacement="outside"
                  placeholder="Enter a title for your project..."
                  className="space-y-2"
                  isRequired
                  errorMessage={formState.errors.title?.message?.toString()}
                  isInvalid={!!formState.errors.title?.message}
                />
              )}
            />

            <Divider />

            <UploadContentCard />

            <Divider />

            <MultiSelectAutocomplete
              label={<h2>Authors</h2>}
              description="Select the main people who worked on this post."
              options={USERS}
              getItemLabel={getMemberName}
              control={control}
              name="authors"
              rules={{
                required: {
                  value: true,
                  message: "Please add at least one author.",
                },
                validate: (v: string[]) =>
                  v.length > 0 || "Please add at least one author.",
              }}
            />

            <Divider />

            <MultiSelectAutocomplete
              label={<h2>Contributors</h2>}
              description="Select the people who helped with this post."
              options={USERS}
              getItemLabel={getMemberName}
              control={control}
              name="contributors"
            />

            <Divider />

            <MultiSelectAutocomplete
              label={<h2>Scientific Fields</h2>}
              description="Select the scientific fields your post is about."
              options={FIELDS}
              getItemLabel={getFieldName}
              control={control}
              name="fields"
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What type will your post be?</h2>}
              description="The type of post represents what kind of content you are sharing."
              placeholder="Select a type for your post..."
              defaultSelectedKey={defType.toString()}
              options={types}
              control={control}
              name="type"
              rules={{
                required: {
                  value: true,
                  message: "Please select the type of post.",
                },
              }}
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What are your feedback preferences?</h2>}
              description="The type of replies you want to encourage under your post."
              placeholder="Select the type of feedback preferences you want..."
              defaultSelectedKey={defFeedback.toString()}
              options={feedbacks}
              name="feedback"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select feedback preferences for your post.",
                },
              }}
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What is the completion of your project?</h2>}
              description="This helps other users understand your work and give advice."
              placeholder="Select the completion status for your post..."
              defaultSelectedKey={defCompletion.toString()}
              options={completions}
              name="completion"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select the completion status of your post.",
                },
              }}
            />

            <Divider />
          </div>
        </Card>
      </div>
    </form>
  );
}
