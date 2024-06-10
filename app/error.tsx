// See https://nextjs.org/docs/app/api-reference/file-conventions/error

"use client"; // Error components must be Client Components

import { Button } from "@nextui-org/react";
import { useEffect } from "react";

/**
 * Fallback UI for component error.
 * Allows resetting component with error without refreshing page.
 */
export default function DefaultError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      data-testid="default-error"
      className="h-80 flex flex-col justify-center items-center bg-warning-100 rounded-lg"
    >
      <h2>Something went wrong!</h2>
      <Button
        // Attempt to recover by trying to re-render the segment
        onPress={reset}
        color="warning"
        className="mt-8"
      >
        <h3 className="px-4">Try again</h3>
      </Button>
    </div>
  );
}
