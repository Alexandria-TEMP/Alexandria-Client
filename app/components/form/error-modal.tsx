import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@nextui-org/react";

/**
 * Modal popup that shows up if there is an error
 * intended to be used with a useDisclosure() hook, called outside of the component so that different functions (e.g. submit function)
 * i need to use this hook particularly because this is what is needed by NextUI  https://nextui.org/docs/components/modal
 * can set whether the modal should be open
 * @param modal the modal controller object, given by a useDisclosure hook
 * @param errorMsg the custom error message, also set externally
 * @returns a modal popup, whose open state is controlled externally, aka its only visible if the controller sets it to be visible
 */
export default function ErrorModal({
  modal,
  errorMsg,
}: {
  // modal type is copied from the returned type of useDisclosure hook
  modal: {
    isOpen: boolean;
    onClose: () => void;
    onOpenChange: () => void;
  };
  errorMsg: string;
}) {
  return (
    <Modal isOpen={modal.isOpen} onOpenChange={modal.onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Error</ModalHeader>
            <ModalBody>
              {/* There was an error when submitting your post. Please try again. */}
              {errorMsg}
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
  );
}
