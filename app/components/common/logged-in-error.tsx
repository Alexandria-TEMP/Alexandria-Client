import Link from "next/link";
import { Button } from "@nextui-org/react";

/**
 * @returns standard page for logged in only actions
 */
export default function NotLoggedInError() {
  return (
    <div
      data-testid="default-error"
      className="h-full flex flex-col justify-center items-center bg-warning-100 rounded-lg space-y-4"
    >
      <h2>You must be logged in to post, comment or review.</h2>
      <div className="flex flex-row space-x-4">
        <Link href="/login">
          <Button variant="solid" color="primary">
            Log in
          </Button>
        </Link>
        <Link href="/signup">
          <Button variant="solid" color="primary">
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
}
