import { Button, Card, Input } from "@nextui-org/react";
import { useForm, Controller, FormState, Control } from "react-hook-form";

export default function PersonalDataCard({
  control,
  formState,
}: {
  control: Control<
    {
      email: string;
      firstName: string;
      lastName: string;
      institution: string;
      password: string;
      confpass: string;
    },
    any
  >;
  formState: FormState<{
    email: string;
    firstName: string;
    lastName: string;
    institution: string;
    password: string;
    confpass: string;
  }>;
}) {
  return (
    <div className="space-y-12 items-center min-w-96 w-1/3 min-h-fit mx-auto place-content-center flex-col flex">
      <h2>Personal Data</h2>
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
    </div>
  );
}
