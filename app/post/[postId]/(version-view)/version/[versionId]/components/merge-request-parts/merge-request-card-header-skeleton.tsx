import { Button, CardHeader, Skeleton } from "@nextui-org/react";
import HeaderSubtle from "@/components/header-subtle";
import ChipWithTitle from "@/components/chip-with-title";

/**
 * Skeleton for a MergeRequestCardHeader, to be displayed while it loads
 */
export default function MergeRequestCardHeaderSkeleton({
  hideContribute,
}: {
  hideContribute?: boolean;
}) {
  return (
    <>
      <CardHeader>
        <Skeleton className="rounded-lg">
          <h1 className="font-semibold">Post title is loading</h1>
        </Skeleton>
      </CardHeader>

      <CardHeader className="-mt-4 flex gap-12">
        <Skeleton className="rounded-lg">
          <Button>Contents|Files</Button>
        </Skeleton>

        {!hideContribute && (
          <Skeleton className="rounded-lg">
            <Button>Contribute</Button>
          </Skeleton>
        )}

        <div className="grow" />

        <ChipWithTitle title="Completion">
          <Skeleton className="rounded-lg">Ideation</Skeleton>
        </ChipWithTitle>

        <ChipWithTitle title="Status">
          <Skeleton className="rounded-lg">Open</Skeleton>
        </ChipWithTitle>

        <div className="flex-col">
          <Skeleton className="rounded-lg">
            <HeaderSubtle>Created on</HeaderSubtle>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <HeaderSubtle>Day Month Year</HeaderSubtle>
          </Skeleton>
        </div>
      </CardHeader>
    </>
  );
}
