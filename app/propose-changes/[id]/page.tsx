"use client";

import { getFieldsMap } from "@/lib/api-calls/fields-api";
import { getMembersMap } from "@/lib/api-calls/member-api";
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
import { onSubmit } from "./lib/submit";
import { getMemberName, getFieldName } from "@/lib/get-format";
import useSWR from "swr";
import getPostData from "@/lib/api-calls/post-api";
import { useEffect } from "react";
import { getCompletionTypes, getFeedbackTypes } from "@/lib/api-calls/tags-api";
import GenericLoadingPage from "@/components/loading-page";

export default function ProposeChanges({ params }: { params: { id: string } }) {
  const postReq = useSWR("/fake/api", getPostData);

  const { handleSubmit, formState, control, getValues, trigger, setValue } =
    useForm({
      mode: "onTouched",
      defaultValues: {
        mrTitle: "",
        contributors: [] as string[],
        anonymous: false,
        originalPostId: params.id,
        updatedTitle: postReq.data ? postReq.data.title : "[Loading...]",
        updatedCompletionStatus: postReq.data
          ? postReq.data.completionStatus
          : "[Loading...]",
        updatedFeedbackPreferences: postReq.data
          ? postReq.data.feedbackPreferences
          : "[Loading...]",
        updatedScientificFields: postReq.data
          ? postReq.data.scientificFieldTags
          : [],
      },
    });

  useEffect(() => {
    if (!!postReq.data && !postReq.isLoading) {
      setValue("updatedTitle", postReq.data.title);
      setValue("updatedScientificFields", postReq.data.scientificFieldTags);
      setValue("updatedCompletionStatus", postReq.data.completionStatus);
      setValue("updatedFeedbackPreferences", postReq.data.feedbackPreferences);
    }
  }, [postReq, setValue]);

  if (postReq.isLoading) return <GenericLoadingPage />;

  return (
    // disable reason: this is the intended usage for handleSubmit
    // linter complains about it being a promise, but if i fix it then `submit` function does not get called
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form className="w-full relative" onSubmit={handleSubmit(onSubmit)}>
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
              optionsGetter={getMembersMap}
            />

            <Divider />

            {/* dropdown with the old fields of the post that can be updated */}
            <Accordion aria-label="update accordion">
              <AccordionItem
                key="1"
                title="Update Existing Fields"
                subtitle="Change existing information about the post to match the changes you made."
              >
                {/* the old title of the post */}
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
                    getItemLabel={getFieldName}
                    control={control}
                    name="updatedScientificFields"
                    optionsGetter={getFieldsMap}
                  />

                  <Divider />

                  {/* update feedback preferences, default values passed via control obj */}
                  <SingleSelectAutocomplete
                    label={<h2>Feedback preferences</h2>}
                    description="Update the type of discussions you would like to see under the updated post."
                    placeholder="Select the type of feedback preferences you want..."
                    name="updatedFeedbackPreferences"
                    control={control}
                    optionsGetter={getFeedbackTypes}
                  />

                  <Divider />

                  {/* update completion type, default values passed via control obj */}
                  <SingleSelectAutocomplete
                    label={<h2>Update the completion status of this post</h2>}
                    description="Update the compleion status of the post. "
                    placeholder="Select the completion status for your post..."
                    name="updatedCompletionStatus"
                    control={control}
                    optionsGetter={getCompletionTypes}
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
