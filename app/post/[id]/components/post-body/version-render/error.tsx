"use client";

import { Button } from "@nextui-org/react";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div
      className="py-20 flex flex-col justify-center items-center bg-warning-100 rounded-lg"
      data-testid="render-error"
    >
      <h1 className="text-warning">Something went wrong!</h1>
      <h3>We failed to get the publication&apos;s contents.</h3>
      <Button onClick={reset} color="warning" className="mt-8">
        <h3 className="px-4">Try again</h3>
      </Button>
    </div>
  );
}
