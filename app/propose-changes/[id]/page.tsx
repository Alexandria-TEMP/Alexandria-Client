"use client";

// import getPostData from "@/lib/api-calls/post-api";
import { getFields } from "@/lib/api-calls/fields-api";
import { getMembers } from "@/lib/api-calls/member-api";
import { useForm, Controller } from "react-hook-form";
import { MultiSelectAutocomplete } from "@/components/form/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "@/components/form/single-select-autocomplete";
import UploadContentCard from "@/components/form/upload-content-card";
import {
  Input,
  Card,
  Divider,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { submit } from "./lib/submit";
import { getMemberName, getFieldName } from "@/lib/get-format";

export default function ProposeChanges({ params }: { params: { id: string } }) {
  //   const data = await getPostData(params.id);
  // TODO make this work with async data fetch somehow
  const data = {
    title: "Post title",
    status: "Open for review",
    authors: ["3"],
    contributors: ["1", "2"],
    anonymous: false,
    createdAt: "10 May 2024",
    currentVersion: {
      id: "1",
      discussions: ["1", "1", "1", "1"],
    },
    id: "1",
    postType: "Reflection",
    scientificFieldTags: ["1", "2", "3"],
    updatedAt: "11 May 2024",
    feedbackPreferences: "Community Discussion",
    completionStatus: "Ongoing",
  };
  const FIELDS = getFields();
  const USERS = getMembers();

  // TODO refactor these into separate api file maybe?
  const feedbacks = ["Community Discussion", "Formal Feedback"];
  const completions = ["Ideation (to begin)", "Ongoing", "Completed"];

  const { handleSubmit, formState, control, getValues, trigger } = useForm({
    mode: "onTouched",
    defaultValues: {
      mrTitle: "",
      contributors: [] as string[],
      anonymous: false,
      originalPostId: params.id,
      updatedTitle: data.title,
      updatedCompletionStatus: data.completionStatus,
      updatedFeedbackPreferences: data.feedbackPreferences,
      updatedScientificFields: data.scientificFieldTags,
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
          <h1 className="max-w-fit">Create a new MR</h1>{" "}
          <Button variant="ghost" type="submit">
            Publish Changes
          </Button>
        </div>
        {/* The actual form */}
        <Card className="p-7">
          <div className="flex flex-col space-y-5">
            <Controller
              name="mrTitle"
              control={control}
              rules={{
                required: "Please enter a title for your MR.",
                maxLength: {
                  value: 150,
                  message: "There is a 150 character limit for MR titles.", // TODO decide how long we actually want this
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  label={<h2 className="max-w-fit inline-block">Title</h2>}
                  labelPlacement="outside"
                  placeholder="Enter a title for your MR..."
                  description="What new changes does this MR bring?"
                  className="space-y-2"
                  isRequired
                  errorMessage={formState.errors.mrTitle?.message?.toString()}
                  isInvalid={!!formState.errors.mrTitle?.message}
                />
              )}
            />

            <Divider />

            <UploadContentCard />

            <Divider />

            <MultiSelectAutocomplete
              label={<h2>Contributors</h2>}
              description="Select the people who worked on these changes."
              options={USERS}
              getItemLabel={getMemberName}
              control={control}
              trigger={trigger}
              name="contributors"
              rules={{
                validate: (v: string[]) => {
                  if (!getValues("anonymous") && v.length <= 0)
                    return "Please add at least one contributor or make these suggestions anonymously.";
                  return true;
                },
              }}
              disableFieldName="anonymous"
              disableMessage="Suggest these changes anonymously (no contributors will be added)"
            />

            <Divider />

            {/* from here, update sectiom */}
            {/* TODO make this like dropdown card of sorts */}
            {/* the old title of the post */}
            <Accordion aria-label="update accordion">
              <AccordionItem
                key="1"
                title="Update Existing Fields"
                subtitle="Change existing information about the post to match the changes you made."
              >
                <div className="space-y-5">
                  <div>
                    <Controller
                      name="updatedTitle"
                      control={control}
                      rules={{
                        maxLength: {
                          value: 150,
                          message:
                            "There is a 150 character limit for post titles.", // TODO decide how long we actually want this
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          {...field}
                          label={<h2 className="inline-block">Title</h2>}
                          labelPlacement="outside"
                          placeholder="Enter a title for the post..."
                          description="Update the original post's title to match the new changes."
                          className="space-y-2"
                          errorMessage={formState.errors.updatedTitle?.message?.toString()}
                          isInvalid={!!formState.errors.updatedTitle?.message}
                        />
                      )}
                    />
                  </div>

                  <Divider />

                  {/* the fields of the original post are passed over via the default values, through control obj */}
                  <MultiSelectAutocomplete
                    label={<h2>Scientific Fields</h2>}
                    description="Modify the list of scientific fields to match the changes you made."
                    options={FIELDS}
                    getItemLabel={getFieldName}
                    control={control}
                    name="updatedScientificFields"
                  />

                  <Divider />

                  <SingleSelectAutocomplete
                    label={<h2>Feedback preferences</h2>}
                    description="Update the type of discussions you would like to see under the updated post."
                    placeholder="Select the type of feedback preferences you want..."
                    options={feedbacks}
                    name="updatedFeedbackPreferences"
                    control={control}
                  />

                  <Divider />

                  <SingleSelectAutocomplete
                    label={<h2>Update the completion status of this post</h2>}
                    description="Update the compleion status of the post. "
                    placeholder="Select the completion status for your post..."
                    options={completions}
                    name="updatedCompletionStatus"
                    control={control}
                  />
                </div>
              </AccordionItem>
            </Accordion>

            <Divider />
          </div>
        </Card>
      </div>
    </form>
  );
}
