"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { onSubmit } from "./lib/submit";

export default function LoginPage() {
  const { control, handleSubmit, formState } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    },
    shouldUseNativeValidation: true,
  });

  return (
    <form
      // disable reason: this is the intended usage for handleSubmit
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full h-full min-h-fit place-content-center m-auto"
    >
      <Card className="relative p-7 space-y-8 items-center place-content-center min-w-96 w-1/3 min-h-fit h-2/3 m-auto">
        <h1>Login to Alexandria</h1>
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Please enter an email address.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{1,4}$/i,
              message: "Please enter a valid email address.",
            },
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="w-2/3"
              placeholder="Enter your email"
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
              placeholder="Enter your passowrd"
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
