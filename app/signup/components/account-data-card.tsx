import { Button, Card, Input } from "@nextui-org/react";
import {
  useForm,
  Controller,
  FormState,
  Control,
  UseFormWatch,
} from "react-hook-form";

export default function AccountDataCard({
  control,
  formState,
  watch,
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
  watch: UseFormWatch<{
    email: string;
    firstName: string;
    lastName: string;
    institution: string;
    password: string;
    confpass: string;
  }>;
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
        name="password"
        control={control}
        rules={{
          required: "Please enter a password.",
          minLength: {
            value: 8,
            message: "Password must contain at least 8 charcters.",
          },
          pattern: {
            value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-])/i,
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
            placeholder="Enter a secure passowrd"
            type="password"
            isRequired
            errorMessage={formState.errors.password?.message?.toString()}
            isInvalid={!!formState.errors.password?.message}
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
