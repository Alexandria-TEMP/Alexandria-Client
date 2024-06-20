// disable reason: this is the intended usage for handleSubmit
// linter complains about it being a promise, but if i fix it then `submit` function does not get called
// i also cannot disable this just for a line because it would have to be inside the html part
/* eslint-disable @typescript-eslint/no-misused-promises */
"use client";

import { Button, Card, Input, useDisclosure } from "@nextui-org/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { submitHandler, FormType } from "./lib/submit";
import Logo from "@/components/theme/logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/lib/validation-rules";
import GenericLoadingPage from "@/loading";
import ErrorModal from "@/components/form/error-modal";
import { getCookie } from "cookies-next";

/**
 * Login page, uses react-hook-form
 * @returns returns a form containing alexandria logo, email and password fields
 */
export default function LoginPage() {
  /* Make sure page is hydrated properly by only returning the jsx when the component is mounted */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* router to refresh the page if necessary */
  const router = useRouter();

  /* Create the form state */
  const { control, handleSubmit, formState } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUseNativeValidation: true,
  });

  /* is loading set to true, if the form is submitting */
  const [isLoading, setIsLoading] = useState(false);

  /* controls for the error dialog for the form submition */
  const errorModal = useDisclosure();
  const [errorMsg, setErrorMsg] = useState("Unknown error");

  /* submit function that also passes the loading and error states */
  const onSubmit: SubmitHandler<FormType> = (data: FormType) =>
    submitHandler(data, setIsLoading, errorModal.onOpen, setErrorMsg, router);

  /* if the page is not hydrated, refresh the page */
  if (!mounted && typeof window !== "undefined") {
    router.refresh();
    return null;
  }

  /* if the user is already logged in, display that */
  if (getCookie("access-token"))
    return (
      <div
        data-testid="default-error"
        className="h-full flex flex-col justify-center items-center bg-primary-100 rounded-lg space-y-4"
      >
        <h2>You are already logged in, {getCookie("user-name")}</h2>{" "}
      </div>
    );

  /* if the form is being submitted, return the loading page, i could make something fancier in the future */
  if (isLoading) return <GenericLoadingPage />;

  return (
    <>
      <ErrorModal
        modal={errorModal}
        errorMsg={"Error when loggin in: " + errorMsg}
      />
      <form
        // disable reason: this is the intended usage for handleSubmit
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex w-full h-full min-h-fit place-content-center m-auto"
      >
        <Card className="relative p-7 space-y-8 items-center place-content-center min-w-96 w-1/3 min-h-fit m-auto">
          <Logo className="h-52" />
          <h1>Login to Alexandria</h1>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Please enter an email address.",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address.",
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                className="w-2/3"
                placeholder="Enter your email."
                errorMessage={formState.errors.email?.message?.toString()}
                isInvalid={!!formState.errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: "Please enter a password." }}
            render={({ field }) => (
              <Input
                {...field}
                className="w-2/3"
                placeholder="Enter your password"
                type="password"
                errorMessage={formState.errors.password?.message?.toString()}
                isInvalid={!!formState.errors.password?.message}
              />
            )}
          />

          <Button className="w-2/3" type="submit" variant="ghost">
            Login
          </Button>
        </Card>
      </form>
    </>
  );
}
