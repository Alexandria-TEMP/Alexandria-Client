"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { onSubmit } from "./lib/submit";
import HeaderSubtle from "@/components/header-subtle";

export default function LoginPage() {
  const { control, handleSubmit, formState } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      institution: "",
      password: "",
    },
    shouldUseNativeValidation: true,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex w-full h-full min-h-fit place-content-center m-auto"
    >
      <Card className="relative space-y-12 items-center place-content-center min-w-96 w-1/3 min-h-fit m-auto py-7">
        <h1>Create an Alxendria account</h1>
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
              label="Email"
              labelPlacement="outside"
              placeholder="Enter your email"
              isRequired
              errorMessage={formState.errors.email?.message?.toString()}
              isInvalid={!!formState.errors.email?.message}
            />
          )}
        />

        <Controller
          name="firstName"
          control={control}
          rules={{
            required: "Please enter your first name.",
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="w-2/3"
              label="First name"
              labelPlacement="outside"
              placeholder="Enter your first name"
              isRequired
              errorMessage={formState.errors.firstName?.message?.toString()}
              isInvalid={!!formState.errors.firstName?.message}
            />
          )}
        />

        <Controller
          name="lastName"
          control={control}
          rules={{
            required: "Please enter your last name.",
          }}
          render={({ field }) => (
            <Input
              {...field}
              className="w-2/3"
              label="Last name"
              labelPlacement="outside"
              placeholder="Enter your last name"
              isRequired
              errorMessage={formState.errors.lastName?.message?.toString()}
              isInvalid={!!formState.errors.lastName?.message}
            />
          )}
        />

        <Controller
          name="institution"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              className="w-2/3"
              label="Institution"
              description="The educational institution you associate with."
              labelPlacement="outside"
              placeholder="Enter your institution"
              errorMessage={formState.errors.institution?.message?.toString()}
              isInvalid={!!formState.errors.institution?.message}
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
              label="Password"
              labelPlacement="outside"
              placeholder="Enter a secure passowrd"
              type="password"
              isRequired
              errorMessage={formState.errors.password?.message?.toString()}
              isInvalid={!!formState.errors.password?.message}
            />
          )}
        />

        <Button className="w-2/3" type="submit" variant="ghost">
          Signup
        </Button>
      </Card>
    </form>
  );
}
