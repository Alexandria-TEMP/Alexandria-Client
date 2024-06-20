// Needs to be client component because so is PeerReviewSection
"use client";

import HeaderSubtle from "@/components/common/header-subtle";
import { capitalizeFirstLetter, formatDateString } from "@/lib/string-utils";
import { idT } from "@/lib/types/api-types";
import { IdProp } from "@/lib/types/react-props/id-prop";
import ReviewChip from "@/components/common/review-chip";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Skeleton,
} from "@nextui-org/react";
import { useMemo } from "react";
import { useReviewData } from "@/lib/api/hooks/review-hooks";
import DefaultError from "@/error";
import useTriggerRerender from "@/lib/hooks/use-trigger-rerender";

/**
 * Displays peer review with feedback, author, decision and date
 * @param id peer review ID
 */
export default function PeerReview({ id }: IdProp) {
  const { data, isLoading, error } = useReviewData(id as idT);
  const decisionColor: "success" | "danger" = useMemo(
    () =>
      data && data.branchReviewDecision === "approved" ? "success" : "danger",
    [data],
  );

  const { triggerRerender } = useTriggerRerender();

  if (error) {
    return <DefaultError error={error} reset={triggerRerender} />;
  }

  return (
    <Card shadow="none" fullWidth>
      <CardHeader className="flex gap-x-2 items-baseline">
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <HeaderSubtle>
            Review made on {data && formatDateString(data.createdAt)}
          </HeaderSubtle>
        </Skeleton>
      </CardHeader>

      <CardBody className="w-full">
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          {data ? <p>{data.feedback}</p> : <div className="h-40" />}
        </Skeleton>
      </CardBody>

      <CardFooter>
        <Skeleton isLoaded={!isLoading} className="rounded-full">
          <ReviewChip small status={data?.branchReviewDecision} />
        </Skeleton>

        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <h3 className={`text-${decisionColor} font-semibold ml-2`}>
            {capitalizeFirstLetter(
              data?.branchReviewDecision ?? "Review loading...",
            )}
          </h3>
        </Skeleton>
      </CardFooter>
    </Card>
  );
}
