"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { onSubmit } from "./lib/submit";
import Logo from "@/components/logo";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { emailRegex } from "@/lib/validation-rules";

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

  /* if the page is not hydrated, refresh the page */
  if (!mounted) {
    router.refresh();
    return null;
  }

  return (
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
  );
}
