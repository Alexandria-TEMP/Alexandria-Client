import { Spinner } from "@nextui-org/react";

/**
 * Large spinner centered that fills all available space
 */
export default function GenericLoadingPage() {
  return (
    <div className="flex place-content-center w-full h-full m-auto items-center grow">
      <Spinner size="lg" data-testid="spinner" />
    </div>
  );
}
