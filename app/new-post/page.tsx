"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { getMembersAsMap } from "../lib/api-calls/member-api";
import { getFieldsMap } from "../lib/api-calls/fields-api";
import { MultiSelectAutocomplete } from "../components/form/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "../components/form/single-select-autocomplete";
import UploadContentCard from "../components/form/upload-content-card";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { Card, Input } from "@nextui-org/react";
import { submit } from "./lib/submit";
import { useForm, Controller } from "react-hook-form";
import {
  getCompletionTypes,
  getFeedbackTypes,
  getPostTypes,
} from "@/lib/api-calls/tags-api";

export default function NewPost() {
  const { handleSubmit, formState, control, trigger, getValues } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      anonymous: false,
      authors: [] as string[],
      contributors: [] as string[],
      fields: [] as string[],
      type: "Ideation (to begin)",
      completion: "Project",
      feedback: "Community Discussion", // TODO these are hardcoded, could just make them empty
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
              description="Select the people who worked on this post."
              getItemLabel={getMemberName}
              control={control}
              trigger={trigger}
              name="authors"
              rules={{
                validate: (v: string[]) => {
                  if (!getValues("anonymous") && v.length <= 0)
                    return "Please add at least one author or make this post anonymous.";
                  return true;
                },
              }}
              disableFieldName="anonymous"
              disableMessage="Post this anonymously (no authors will be posted)"
              optionsGetter={getMembersAsMap}
            />

            <Divider />

            <MultiSelectAutocomplete
              label={<h2>Scientific Fields</h2>}
              description="Select the scientific fields your post is about."
              getItemLabel={getFieldName}
              control={control}
              name="fields"
              optionsGetter={getFieldsMap}
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What type will your post be?</h2>}
              description="The type of post represents what kind of content you are sharing."
              placeholder="Select a type for your post..."
              control={control}
              name="type"
              rules={{
                required: {
                  value: true,
                  message: "Please select the type of post.",
                },
              }}
              optionsGetter={getPostTypes}
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What are your feedback preferences?</h2>}
              description="The type of replies you want to encourage under your post."
              placeholder="Select the type of feedback preferences you want..."
              name="feedback"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select feedback preferences for your post.",
                },
              }}
              optionsGetter={getFeedbackTypes}
            />

            <Divider />

            <SingleSelectAutocomplete
              label={<h2>What is the completion of your project?</h2>}
              description="This helps other users understand your work and give advice."
              placeholder="Select the completion status for your post..."
              name="completion"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select the completion status of your post.",
                },
              }}
              optionsGetter={getCompletionTypes}
            />

            <Divider />
          </div>
        </Card>
      </div>
    </form>
  );
}
