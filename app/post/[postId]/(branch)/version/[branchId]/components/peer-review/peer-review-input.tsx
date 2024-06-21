"use client";

import { idT } from "@/lib/types/api-types";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Radio,
  RadioGroup,
  Textarea,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormType, reviewSubmitHandler } from "../../lib/submit-review";
import { useCookieWithRefresh } from "@/lib/cookies/cookie-hooks";
import GenericLoadingPage from "@/loading";

/**
 * Input box for a new peer review
 * @param branchID the id of the OPEN branch we are reviewing
 * NOTE i am assuming this the id of an open branch, and i do not check that
 * backend should give error if trying to review closed branch
 * @param postID the id of the PROJECT post, necessary for redirect on submit
 */
export default function PeerReviewInput({
  branchID,
  postID,
}: {
  branchID: idT;
  postID: idT;
}) {
  // Needed to navigate back when cancelling a review and redirect on submit
  const router = useRouter();

  /* get the currently logged in user's access token, and make sure its refreshed if it expires */
  const accessToken = useCookieWithRefresh("access-token");

  /* review form state */
  const { formState, control, handleSubmit } = useForm<FormType>({
    mode: "onTouched",
    defaultValues: {
      feedback: undefined,
      branchReviewDecision: undefined,
    },
  });

  /* loading and error states for submitting */
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: FormType) =>
    await reviewSubmitHandler(
      data,
      branchID,
      postID,
      accessToken,
      setIsLoading,
      setErrorMsg,
      router,
    );

  if (isLoading) return <GenericLoadingPage />;

  return (
    // disable reason: this is the intended usage for handleSubmit
    // linter complains about it being a promise, but if i fix it then `submit` function does not get called
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card isBlurred className="sticky top-20 z-50">
        <CardBody>
          <Controller
            name="feedback"
            control={control}
            rules={{
              required: {
                value: true,
                message: "You cannot submit an empty review",
              },
            }}
            render={({ field }) => (
              <Textarea
                {...field}
                errorMessage={
                  formState.errors.feedback?.message?.toString() || errorMsg
                }
                isInvalid={!!formState.errors.feedback?.message || !!errorMsg}
                minRows={5}
                label="Your review"
                labelPlacement="outside"
                placeholder="Enter your feedback for this proposal..."
                variant="bordered"
                fullWidth
                classNames={{
                  label: "text-lg font-semibold",
                }}
              />
            )}
          />
        </CardBody>
        <CardFooter>
          <Controller
            name="branchReviewDecision"
            control={control}
            rules={{ required: "You must select if you approve or not." }}
            render={({ field }) => (
              <RadioGroup
                {...field}
                onValueChange={(value) => field.onChange(value)}
                orientation="horizontal"
                errorMessage={formState.errors.branchReviewDecision?.message?.toString()} //only display submit error once, under textarea
                isInvalid={
                  !!formState.errors.branchReviewDecision?.message || !!errorMsg
                }
              >
                <Radio color="success" value="approved">
                  Accept
                </Radio>
                <Radio color="danger" value="rejected">
                  Reject
                </Radio>
              </RadioGroup>
            )}
          />
          <div className="grow" />
          <Button
            // isDisabled={!approval || !feedback || feedback === ""}
            type="submit"
            color="primary"
          >
            Submit review
          </Button>
          <Button className="ml-2" onPress={() => router.back()}>
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
