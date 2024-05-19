"use client";

import { Button, Card, Divider, Input } from "@nextui-org/react";
import { useForm, Controller } from "react-hook-form";
import { onSubmit } from "./lib/submit";
import PersonalDataCard from "./components/personal-data-card";
import AccountDataCard from "./components/account-data-card";

export default function LoginPage() {
  const { control, handleSubmit, formState, watch } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      institution: "",
      password: "",
      confpass: "",
    },
    shouldUseNativeValidation: true,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative flex flex-col space-y-7 w-full h-full min-h-fit m-auto py-7"
    >
      <h1 className="w-full text-center">Create an Alexandria account</h1>

      <Card className="flex flex-row justify-between content-center p-10">
        <PersonalDataCard control={control} formState={formState} />
        <Divider orientation="vertical" />
        <AccountDataCard
          control={control}
          formState={formState}
          watch={watch}
        />
      </Card>
    </form>
  );
}
