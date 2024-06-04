import { Spinner } from "@nextui-org/react";

export default function GenericLoadingPage() {
  return (
    <div className="flex place-content-center w-full h-full m-auto items-center grow">
      <Spinner size="lg" data-testid="spinner" />
    </div>
  );
}
