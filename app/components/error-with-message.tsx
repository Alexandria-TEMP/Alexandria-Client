"use client";

import { Button } from "@nextui-org/react";

/**
 * Displays a box with warning color, that allows the component to be reset without
 * refreshing the entire page. Should be used in case something goes wrong when fetching data.
 * @param reset called when the button "Try again" is pressed
 */
export default function ErrorWithMessage({
  message,
  reset, // TODO Props must be serializable for components in the "use client" entry file, "reset" is invalid.
}: {
  message: string;
  reset?: () => void;
}) {
  return (
    <div
      className="h-80 flex flex-col justify-center items-center bg-warning-100 rounded-lg"
      data-testid="render-error"
    >
      <h1 className="text-warning">Something went wrong!</h1>
      <h3>{message}</h3>
      {reset && (
        <Button onClick={reset} color="warning" className="mt-8">
          <h3 className="px-4">Try again</h3>
        </Button>
      )}
    </div>
  );
}
