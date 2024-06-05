"use client";

import {
  Card,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormType, submitHandler } from "./lib/submit";
import PersonalDataCard from "./components/personal-data-card";
import AccountDataCard from "./components/account-data-card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GenericLoadingPage from "@/components/loading-page";

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

  /* is loading set to true, if the form is submitting */
  const [isLoading, setIsLoading] = useState(false);

  /* controls for the error dialog for the form submition */
  const errorModal = useDisclosure();

  /* submit function that also passes the loading and error states */
  const onSubmit: SubmitHandler<FormType> = (data: FormType) =>
    submitHandler(data, setIsLoading, errorModal.onOpen);

  /* if the page is not hydrated, refresh the page */
  if (!mounted) {
    router.refresh();
    return null;
  }

  /* if the form is being submitted, return the loading page, i could make something fancier in the future */
  if (isLoading) return <GenericLoadingPage />;

  return (
    <>
      {/* error alert, only visible if there is an error */}
      <Modal isOpen={errorModal.isOpen} onOpenChange={errorModal.onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Error</ModalHeader>
              <ModalBody>
                There was an error when submitting your post. Please try again.
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
    </>
  );
}
