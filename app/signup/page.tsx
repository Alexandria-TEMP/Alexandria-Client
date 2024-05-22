"use client";

import { Card, Divider } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { onSubmit } from "./lib/submit";
import PersonalDataCard from "./components/personal-data-card";
import AccountDataCard from "./components/account-data-card";

/**
 * The types of the fields the form contains.
 * This is not the same as the FormData used for submitting
 * since the form also has a "confirm password field"
 */
export type FormType = {
  email: string;
  firstName: string;
  lastName: string;
  institution: string;
  password: string;
  confpass: string;
};

/**
 * @returns A page containing the title and the sinup form
 * as a div with input fields divided into two categories:
 * personal data and account data
 * the account data half also contains the submit button
 */
export default function SignupPage() {
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
