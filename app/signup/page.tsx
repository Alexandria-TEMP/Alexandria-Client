"use client";

import { Card, Divider } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { onSubmit } from "./lib/submit";
import PersonalDataCard from "./components/personal-data-card";
import AccountDataCard from "./components/account-data-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
  fields: string[];
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
  /* Make sure page is hydrated properly by only returning the jsx when the component is mounted */
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  /* router to refresh the page if necessary */
  const router = useRouter();

  /* create the form state */
  const { control, handleSubmit, formState, watch } = useForm({
    mode: "onTouched",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      institution: "",
      fields: [] as string[],
      password: "",
      confpass: "",
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
      // the react-hook-form solution for typescripting their function did not work
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
