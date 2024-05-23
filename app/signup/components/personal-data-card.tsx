import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller, FormState, Control } from "react-hook-form";
import { FormType } from "../page";

/**
 * Component that groups together form fields about personal data when creating a new account.
 * This component is not intended to be reusable, it is only here for grouping purposes
 * @param control - object passed from parent useForm hook state, needed to control and register custom components
 * @param formState - object passed form parent useForm hook state, needed to store the state of the input fields
 * @returns a div containing first name, last name and institution fields
 */
export default function PersonalDataCard({
  control,
  formState,
}: {
  control: Control<FormType, any>;
  formState: FormState<FormType>;
}) {
  return (
    <div className="space-y-12 items-center min-w-96 w-1/3 min-h-fit mx-auto place-content-center flex-col flex">
      <h2>Personal Data</h2>
      <Controller
        name="firstName"
        control={control}
        rules={{
          required: "Please enter your first name.",
          maxLength: {
            value: 100,
            message: "There is a 100 charcter restriction on name input.",
          },
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
            data-testid="first-name"
          />
        )}
      />

      <Controller
        name="lastName"
        control={control}
        rules={{
          required: "Please enter your last name.",
          maxLength: {
            value: 100,
            message: "There is a 100 charcter restriction on name input.",
          },
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
            data-testid="last-name"
          />
        )}
      />

      <Controller
        name="institution"
        control={control}
        rules={{
          maxLength: {
            value: 150,
            message: "There is a 150 charcter restriction on institution name.",
          },
        }}
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
            data-testid="institution"
          />
        )}
      />
    </div>
  );
}
