"use client";

import { Button, Input } from "@nextui-org/react";
import { Controller, FormState, Control, UseFormWatch } from "react-hook-form";
import { FormType } from "../lib/submit";
import { emailRegex, passwordRegex } from "@/lib/validation-rules";

/**
 * Component that groups together form fields about account data when creating a new account.
 * This component is not intended to be reusable, it is only here for grouping purposes
 * @param control - object passed from parent useForm hook state, needed to control and register custom components
 * @param formState - object passed form parent useForm hook state, needed to store the state of the input fields
 * @param watch -  object passed from parent useForm hook state, needed to watch for changes in password input field, so that confirm password field can compare its input to that
 * @returns a div containing email, password, confirm password fields and the submit button
 */
export default function AccountDataCard({
  control,
  formState,
  watch,
}: {
  control: Control<FormType>;
  formState: FormState<FormType>;
  watch: UseFormWatch<FormType>;
}) {
  return (
    <div className="space-y-12 items-center min-w-96 w-1/3 min-h-fit mx-auto flex-col flex">
      <h2>Account Data</h2>
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
            label="Email"
            labelPlacement="outside"
            placeholder="Enter your email."
            isRequired
            errorMessage={formState.errors.email?.message?.toString()}
            isInvalid={!!formState.errors.email?.message}
            data-testid="email"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "Please enter a password.",
          minLength: {
            value: 8,
            message: "Password must contain at least 8 characters.",
          },
          pattern: {
            value: passwordRegex,
            message:
              "Password must contain at least one upper case and one lower case letter, a number and a special character.",
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            className="w-2/3"
            label="Password"
            labelPlacement="outside"
            placeholder="Enter a secure password."
            type="password"
            isRequired
            errorMessage={formState.errors.password?.message?.toString()}
            isInvalid={!!formState.errors.password?.message}
            data-testid="password"
          />
        )}
      />

      <Controller
        name="confpass"
        control={control}
        rules={{
          required: "Please re-enter your password.",
          validate: (value: string) => {
            if (watch("password") !== value) {
              return "Your passwords do not match.";
            }
          },
        }}
        render={({ field }) => (
          <Input
            {...field}
            className="w-2/3"
            label="Confirm Password"
            labelPlacement="outside"
            placeholder="Re-enter your password."
            type="password"
            isRequired
            errorMessage={formState.errors.confpass?.message?.toString()}
            isInvalid={!!formState.errors.confpass?.message}
            data-testid="confirm-pwd"
          />
        )}
      />

      <Button
        className="w-2/3 place-content-center m-auto"
        type="submit"
        variant="shadow"
        color="primary"
      >
        Signup
      </Button>
    </div>
  );
}
