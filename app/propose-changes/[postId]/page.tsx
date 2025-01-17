"use client";

import { useScientificFields } from "@/lib/api/hooks/scientific-fields-hooks";
import { useFetchMembers } from "@/lib/api/hooks/member-hooks";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
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
  useDisclosure,
} from "@nextui-org/react";
import { submitHandler, FormType } from "./lib/submit";
import { useEffect, useState } from "react";
import {
  getCompletionTypes,
  getFeedbackTypes,
} from "@/lib/api/services/tags-api";
import GenericLoadingPage from "@/loading";
import { idT } from "@/lib/types/api-types";
import { maxTitle } from "@/lib/validation-rules";
import { getFieldName, getMemberName } from "@/lib/get-format";
import ErrorModal from "@/components/form/error-modal";
import { usePostAndScientificFieldData } from "@/lib/api/hooks/post-hooks";
import { pathIDToPostUnionID } from "@/lib/id-parser";
import { useRouter } from "next/navigation";
import NotLoggedInError from "@/components/common/logged-in-error";
import { useCookieWithRefresh } from "@/lib/cookies/cookie-hooks";

/**
 * Propose changes / create a new branch page
 * @param params the id of the project post you want to create a new branch for
 * @returns the branch creation form
 */
export default function ProposeChanges({
  params,
}: {
  params: { postId: string };
}) {
  /* router for redirect on (successful) submit */
  const router = useRouter();

  /* get the currently logged in user id */
  const loggedInId: idT = Number(useCookieWithRefresh("user-id"));

  /* get the currently logged in user's access token, and make sure its refreshed if it expires */
  const accessToken = useCookieWithRefresh("access-token");

  const projectPostId = pathIDToPostUnionID(params.postId);
  const postReq = usePostAndScientificFieldData(projectPostId);

  /* create form state */
  const { handleSubmit, formState, control, getValues, trigger, setValue } =
    useForm<FormType>({
      mode: "onTouched",
      defaultValues: {
        anonymous: false,
        branchTitle: "",
        collaboratingMemberIDs: [loggedInId],
        projectPostID: projectPostId.id as idT,
        updatedCompletionStatus:
          postReq.data?.projectPost?.projectCompletionStatus,
        updatedFeedbackPreferences:
          postReq.data?.projectPost?.projectFeedbackPreference,
        updatedPostTitle: postReq.data?.post.title,
        updatedScientificFieldIDs: postReq.data?.scientificFieldTagIDs,
        newFile: null,
      },
    });

  /* update form values once the post request finishes */
  useEffect(() => {
    if (!!postReq.data && !postReq.isLoading && !!postReq.data.projectPost) {
      setValue("updatedPostTitle", postReq.data.post.title);
      setValue("updatedScientificFieldIDs", postReq.data.scientificFieldTagIDs);
      setValue(
        "updatedCompletionStatus",
        postReq.data.projectPost?.projectCompletionStatus,
      );
      setValue(
        "updatedFeedbackPreferences",
        postReq.data.projectPost?.projectFeedbackPreference,
      );
      setValue("collaboratingMemberIDs", [loggedInId]);
    }
  }, [postReq, setValue, loggedInId]);

  /* is loading set to true, if the form is submitting */
  const [isLoading, setIsLoading] = useState(false);

  /* controls for the error dialog for the form submition */
  const errorModal = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("Unknown error");

  /* submit function that also passes the loading and error states */
  const onSubmit: SubmitHandler<FormType> = (data: FormType) =>
    submitHandler(
      data,
      accessToken,
      setIsLoading,
      errorModal.onOpen,
      setErrorMessage,
      router,
    );

  /* if the user is not logged in, display error page */
  if (!accessToken) return <NotLoggedInError />;

  /* if the form is being submitted, return the loading page, i could make something fancier in the future */
  /* while fetching the post data, wait */
  if (isLoading || postReq.isLoading) return <GenericLoadingPage />;

  /* if trying to propose changes to a non-project post, display an error */
  if (!projectPostId.isProject)
    return (
      <div
        data-testid="default-error"
        className="h-80 flex flex-col justify-center items-center bg-warning-100 rounded-lg"
      >
        <h2>You cannot propose changes to a non-project post!</h2>
      </div>
    );

  return (
    <>
      <ErrorModal
        modal={errorModal}
        errorMsg={"Error when submitting: " + errorMessage}
      />
      <form
        // disable reason: this is the intended usage for handleSubmit
        // linter complains about it being a promise, but if i fix it then `submit` function does not get called
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="w-full relative"
      >
        <div className="m-auto max-w-4xl w-10/12">
          {/* Little top bar */}
          <div className="sticky flex justify-between py-5">
            <h1 className="max-w-fit">Contribute to a Post</h1>{" "}
            <Button variant="ghost" type="submit">
              Publish Contribution
            </Button>
          </div>
          {/* The actual form */}
          <Card className="p-7">
            <div className="flex flex-col space-y-5">
              <Controller
                name="branchTitle"
                control={control}
                rules={{
                  required: "Please enter a title for your contribution.",
                  maxLength: {
                    value: maxTitle,
                    message:
                      "There is a " + maxTitle + " character limit for titles.", // TODO decide how long we actually want this
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    label={<h2 className="max-w-fit inline-block">Title</h2>}
                    labelPlacement="outside"
                    placeholder="Enter a title for your contribution..."
                    description="Briefly describe the changes your proposal brings."
                    className="space-y-2"
                    isRequired
                    errorMessage={formState.errors.branchTitle?.message?.toString()}
                    isInvalid={!!formState.errors.branchTitle?.message}
                  />
                )}
              />

              <Divider />

              <UploadContentCard
                name="newFile"
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
                label={<h2>Contributors</h2>}
                description="Select the people who worked on these changes."
                getItemLabel={getMemberName}
                control={control}
                trigger={trigger}
                name="collaboratingMemberIDs"
                rules={{
                  validate: (v: string[]) => {
                    if (!getValues("anonymous") && v.length <= 0)
                      return "Please add at least one contributor or make this contribution anonymously.";
                    return true;
                  },
                }}
                disableFieldName="anonymous"
                disableMessage="Suggest these changes anonymously"
                optionsHook={useFetchMembers}
                nonRemovables={[loggedInId]}
                nonRemoveReason="You must be in the contributor list, or make this contribution anonymously."
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
                        name="updatedPostTitle"
                        control={control}
                        rules={{
                          maxLength: {
                            value: maxTitle,
                            message:
                              "There is a " +
                              maxTitle +
                              " character limit for post titles.", // TODO decide how long we actually want this
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
                            errorMessage={formState.errors.updatedPostTitle?.message?.toString()}
                            isInvalid={
                              !!formState.errors.updatedPostTitle?.message
                            }
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
                      name="updatedScientificFieldIDs"
                      optionsHook={useScientificFields}
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
                      label={<h2>Completion Status</h2>}
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
    </>
  );
}
