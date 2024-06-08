import HeaderSubtle from "@/components/header-subtle";
import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";
import ReviewChip from "../../../components/review-chip";

/**
 * Placeholder card for [MergeRequestCard](./merge-request-card.tsx), which
 * can be rendered while it loads.
 */
export default function MergeRequestCardSkeleton() {
  return (
    <Card className="w-full">
      <CardBody>
        <Skeleton className="rounded-lg">
          <h3>Loading version data...</h3>
          <HeaderSubtle>Created on DATE</HeaderSubtle>
        </Skeleton>
      </CardBody>
      <CardFooter>
        <div className="grow" />
        <Skeleton className="rounded-full">
          <ReviewChip status="open" />
        </Skeleton>
        <Skeleton className="rounded-full">
          <ReviewChip status="open" />
        </Skeleton>
        <Skeleton className="rounded-full">
          <ReviewChip status="open" />
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
