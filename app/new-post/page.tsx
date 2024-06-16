"use client";

import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { useFetchMembers } from "@/lib/api/hooks/member-hooks";
import { useScientificFields } from "../lib/api/hooks/scientific-fields-hooks";
import { MultiSelectAutocomplete } from "../components/form/multi-select-autocomplete";
import { SingleSelectAutocomplete } from "../components/form/single-select-autocomplete";
import UploadContentCard from "../components/form/upload-content-card";
import { getMemberName, getFieldName } from "@/lib/get-format";
import { Card, Input, useDisclosure } from "@nextui-org/react";
import { FormType, submitHandler } from "./lib/submit";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  getCompletionTypes,
  getFeedbackTypes,
  getPostTypes,
} from "@/lib/api/services/tags-api";
import { MemberT, idT } from "@/lib/types/api-types";
import { maxTitle } from "@/lib/validation-rules";
import { useState } from "react";
import GenericLoadingPage from "@/loading";
import ErrorModal from "@/components/form/error-modal";
import { useRouter } from "next/navigation";

// TODO, in the future the currently logged in member should be fetched from some sort of session variable
const loggedIn: MemberT = {
  id: 1,
  email: "kopernicus@tudelft.nl",
  firstName: "Metal Bar",
  institution: "TU Delft",
  lastName: "Clanging",
  scientificFieldTagIDs: [],
};

/**
 * New post form
 * creates the form state and submit handler
 * @returns the post creation form
 */
export default function NewPost() {
  /* router for redirect on (successful) submit */
  const router = useRouter();

  /* create the form state */
  const { handleSubmit, formState, control, trigger, getValues, watch } =
    useForm<FormType>({
      mode: "onTouched",
      defaultValues: {
        title: "",
        anonymous: false,
        authorMemberIDs: [loggedIn.id],
        scientificFieldTagIDs: [] as idT[],
        postType: "question",
        projectCompletionStatus: "idea",
        projectFeedbackPreference: "discussion feedback",
        file: null,
      },
    });

  /* listen to changes to post type field, so as to conditionally display completion and feedback options */
  const watchPostType = watch("postType");

  /* is loading set to true, if the form is submitting */
  const [isLoading, setIsLoading] = useState(false);

  /* controls for the error dialog for the form submition */
  const errorModal = useDisclosure();

  /* submit function that also passes the loading and error states */
  const onSubmit: SubmitHandler<FormType> = (data: FormType) =>
    submitHandler(data, setIsLoading, errorModal.onOpen, router);

  /* if the form is being submitted, return the loading page, i could make something fancier in the future */
  if (isLoading) return <GenericLoadingPage />;

  return (
    <>
      <ErrorModal
        modal={errorModal}
        errorMsg="There was an error when submitting your post. Please try again."
      />
      <form
        // disable reason: this is the intended usage for handleSubmit
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative"
      >
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
                    value: maxTitle,
                    message:
                      "There is a " +
                      maxTitle +
                      " character limit for post titles.",
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

              <UploadContentCard
                name="file"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please upload a zipped version of your project.",
                  },
                }}
              />

              <Divider />

              <MultiSelectAutocomplete
                label={<h2>Authors</h2>}
                description="Select the people who worked on this post."
                getItemLabel={getMemberName}
                control={control}
                trigger={trigger}
                name="authorMemberIDs"
                rules={{
                  validate: (v: string[]) => {
                    if (!getValues("anonymous") && v.length <= 0)
                      return "Please add at least one author or make this post anonymous.";
                    return true;
                  },
                }}
                disableFieldName="anonymous"
                disableMessage="Post this anonymously."
                optionsHook={useFetchMembers}
                nonRemovables={[loggedIn.id]}
                nonRemoveReason="You must be in the author list, or make this post anonymous."
              />

              <Divider />

              <MultiSelectAutocomplete
                label={<h2>Scientific Fields</h2>}
                description="Select the scientific fields your post is about."
                getItemLabel={getFieldName}
                control={control}
                name="scientificFieldTagIDs"
                optionsHook={useScientificFields}
              />

              <Divider />

              <SingleSelectAutocomplete
                label={<h2>What type will your post be?</h2>}
                description="The type of post represents what kind of content you are sharing."
                placeholder="Select a type for your post..."
                control={control}
                name="postType"
                rules={{
                  required: {
                    value: true,
                    message: "Please select the type of post.",
                  },
                }}
                optionsGetter={getPostTypes}
              />

              <Divider />

              {watchPostType === "project" && (
                <>
                  <SingleSelectAutocomplete
                    label={<h2>What are your feedback preferences?</h2>}
                    description="The type of replies you want to encourage under your post."
                    placeholder="Select the type of feedback preferences you want..."
                    name="projectFeedbackPreference"
                    control={control}
                    rules={{
                      required: {
                        value: watchPostType == "project",
                        message:
                          "Please select feedback preferences for your post.",
                      },
                    }}
                    optionsGetter={getFeedbackTypes}
                  />

                  <Divider />

                  <SingleSelectAutocomplete
                    label={<h2>What is the completion of your project?</h2>}
                    description="This helps other users understand your work and give advice."
                    placeholder="Select the completion status for your post..."
                    name="projectCompletionStatus"
                    control={control}
                    rules={{
                      required: {
                        value: watchPostType == "project",
                        message:
                          "Please select the completion status of your post.",
                      },
                    }}
                    optionsGetter={getCompletionTypes}
                  />

                  <Divider />
                </>
              )}
            </div>
          </Card>
        </div>
      </form>
    </>
  );
}
