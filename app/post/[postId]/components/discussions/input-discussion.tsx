"use client";

import { useState } from "react";
import { Button, Spinner, Switch, Textarea } from "@nextui-org/react";
import { IdProp } from "@/lib/types/react-props/id-prop";
import { DiscussionCreationFormT, idT } from "@/lib/types/api-types";
import HeaderSubtle from "@/components/common/header-subtle";
import { Controller, useForm } from "react-hook-form";
import {
  replyDiscussionSubmitHandler,
  rootDiscussionSubmitHandler,
} from "../../lib/submit-discussion";
import { useCookieWithRefresh } from "@/lib/cookies/cookie-hooks";
import { SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

/**
 * TextArea to create a new discussion for some Version.
 * Includes header, and submit button.
 * @param id discussion container ID or discussion ID
 * @param isRoot indicates discussion replies directly to a post or branch
 * @param onCancel action that happens when 'cancel' button is pressed.
 *                 if undefined, no 'cancel' button will be rendered
 * @param replyTo optional name displayed next to 'Reply to'
 */
export default function InputDiscussion({
  id,
  isRoot = false,
  onCancel,
  replyTo,
}: IdProp &
  Readonly<{ isRoot?: boolean; onCancel?: () => void; replyTo?: string }>) {
  /* router for redirect on (successful) submit */
  const router = useRouter();

  /* get the currently logged in user's access token, and make sure its refreshed if it expires */
  const accessToken = useCookieWithRefresh("access-token");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const { handleSubmit, formState, control } = useForm<DiscussionCreationFormT>(
    {
      mode: "onTouched",
      defaultValues: {
        text: "",
        anonymous: false,
      },
    },
  );

  /* submit function that also passes the loading and error states */
  const onSubmit: SubmitHandler<DiscussionCreationFormT> = async (
    data: DiscussionCreationFormT,
  ) => {
    isRoot
      ? await rootDiscussionSubmitHandler(
          data,
          id as idT,
          accessToken,
          setIsLoading,
          setErrorMsg,
          router,
        )
      : await replyDiscussionSubmitHandler(
          data,
          id as idT,
          accessToken,
          setIsLoading,
          setErrorMsg,
          router,
        );
  };

  if (isLoading) return <Spinner></Spinner>;

  return (
    // disable reason: this is the intended usage for handleSubmit
    // linter complains about it being a promise, but if i fix it then `submit` function does not get called
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="text"
        control={control}
        rules={{
          required: {
            value: true,
            message: "You cannot submit an empty discussion.",
          },
        }}
        render={({ field }) => (
          <Textarea
            {...field}
            label={
              isRoot ? (
                <h2>Your reply</h2>
              ) : (
                <HeaderSubtle>
                  {replyTo ? `Reply to ${replyTo}` : "Your reply"}
                </HeaderSubtle>
              )
            }
            labelPlacement="outside"
            placeholder={
              isRoot ? "Start a new discussion..." : "Reply to a discussion..."
            }
            errorMessage={
              formState.errors.text?.message?.toString() || errorMsg
            }
            isInvalid={!!formState.errors.text?.message || !!errorMsg}
            data-testid="input-discussion-textarea"
          />
        )}
      />
      <div className="flex flex-row mt-4 content-center gap-2">
        <Controller
          name="anonymous"
          control={control}
          render={({ field }) => (
            <Switch checked={field.value} onChange={field.onChange} size="sm">
              <HeaderSubtle>Anonymous reply</HeaderSubtle>{" "}
            </Switch>
          )}
        />
        <div className="grow" />
        {onCancel && (
          <Button color="danger" onPress={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" data-testid="submit-discussion">
          Post your answer
        </Button>
      </div>
    </form>
  );
}
